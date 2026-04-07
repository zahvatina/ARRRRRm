import type { Conversation, OperatorInboxChannel } from "../../../types/chat";

export const DEFAULT_OPERATOR_INBOX_MODE: OperatorInboxChannel = "chat";

export const OPERATOR_CHANNEL_LABELS: Record<OperatorInboxChannel, string> = {
  chat: "Чат",
  tickets: "Заявки",
  calls: "Звонки",
  mail: "Почта",
};

export function conversationInboxKeys(c: Conversation): OperatorInboxChannel[] {
  return c.operatorChannels?.length ? c.operatorChannels : ["chat"];
}

export function filterConversationsByInbox(list: Conversation[], mode: OperatorInboxChannel): Conversation[] {
  return list.filter((c) => conversationInboxKeys(c).includes(mode));
}

export function inboxModeLabel(mode: OperatorInboxChannel): string {
  return OPERATOR_CHANNEL_LABELS[mode];
}
