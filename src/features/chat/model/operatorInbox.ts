import type { Conversation, OperatorInboxChannel, OperatorInboxChannels } from "../../../types/chat";

export const DEFAULT_OPERATOR_INBOX: OperatorInboxChannels = {
  chat: true,
  tickets: true,
  calls: true,
  mail: true,
};

export const OPERATOR_CHANNEL_LABELS: Record<OperatorInboxChannel, string> = {
  chat: "Чат",
  tickets: "Заявки",
  calls: "Звонки",
  mail: "Почта",
};

export function conversationInboxKeys(c: Conversation): OperatorInboxChannel[] {
  return c.operatorChannels?.length ? c.operatorChannels : ["chat"];
}

export function filterConversationsByInbox(list: Conversation[], inbox: OperatorInboxChannels): Conversation[] {
  const active = (Object.entries(inbox) as [OperatorInboxChannel, boolean][])
    .filter(([, on]) => on)
    .map(([k]) => k);
  const total = (Object.keys(inbox) as OperatorInboxChannel[]).length;
  if (active.length === total) return list;

  return list.filter((c) => {
    const keys = conversationInboxKeys(c);
    return keys.some((k) => active.includes(k));
  });
}

export function inboxSelectionSummary(inbox: OperatorInboxChannels): string {
  const on = (Object.entries(inbox) as [OperatorInboxChannel, boolean][])
    .filter(([, v]) => v)
    .map(([k]) => OPERATOR_CHANNEL_LABELS[k]);
  return on.join(", ");
}
