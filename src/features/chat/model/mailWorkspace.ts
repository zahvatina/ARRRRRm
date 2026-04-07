import type { Conversation, MailThreadDetail, OperatorInboxChannel } from "../../../types/chat";

/** Почтовый макет: в режиме «Почта» список слева уже отфильтрован по почте — всегда показываем карточку входящего письма. */
export function shouldShowMailWorkspace(_conversation: Conversation, mode: OperatorInboxChannel): boolean {
  return mode === "mail";
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
    receivedAt,
    body: mailBodyFallback(conversation),
  };
}
