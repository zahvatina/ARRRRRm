import type {
  Conversation,
  MailThreadDetail,
  OperatorInboxChannel,
  OperatorInboxChannels,
} from "../../../types/chat";

/** Почтовый макет: оператор принимает почту, а у обращения есть канал mail; чат показываем только если включён чат и у треда есть чат. */
export function shouldShowMailWorkspace(conversation: Conversation, inbox: OperatorInboxChannels): boolean {
  const ch: OperatorInboxChannel[] = conversation.operatorChannels?.length
    ? conversation.operatorChannels
    : ["chat"];
  const hasMail = ch.includes("mail");
  const hasChat = ch.includes("chat");
  if (!hasMail || !inbox.mail) return false;
  if (inbox.chat && hasChat) return false;
  return true;
}

export function mailBodyFallback(conversation: Conversation): string {
  for (let i = conversation.messages.length - 1; i >= 0; i--) {
    const m = conversation.messages[i];
    if (m.role === "client") return m.body;
  }
  return conversation.messages[0]?.body ?? "";
}

export function resolveMailDetail(conversation: Conversation): MailThreadDetail {
  if (conversation.mailDetail) return conversation.mailDetail;
  const firstClient = conversation.messages.find((m) => m.role === "client");
  const d = firstClient?.calendarDate ?? "";
  const t = firstClient?.time ?? conversation.lastTime;
  const receivedAt = d && t ? `${d} ${t}` : `${d}${t}`.trim() || "—";
  return {
    fromEmail: conversation.profile.email,
    subject: `Вопрос по теме «${conversation.threadTag}»`,
    statusLabel: "Новое",
    receivedAt,
    body: mailBodyFallback(conversation),
  };
}
