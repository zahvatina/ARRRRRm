import type {
  CallSessionInfo,
  CallTranscriptLine,
  Conversation,
  OperatorInboxChannel,
} from "../../../types/chat";

export function shouldShowCallsWorkspace(mode: OperatorInboxChannel): boolean {
  return mode === "calls";
}

export function resolveCallTranscript(conversation: Conversation): CallTranscriptLine[] {
  if (conversation.callTranscript?.length) return conversation.callTranscript;
  return conversation.messages.map((m) => ({
    speaker: m.role === "client" ? "client" : "agent",
    time: [m.calendarDate, m.time].filter(Boolean).join(" "),
    text: m.body,
  }));
}

export function resolveCallSession(conversation: Conversation): CallSessionInfo {
  return (
    conversation.callSession ?? {
      displayNumber: conversation.profile.phones[0]?.number ?? "—",
      elapsedSeconds: 0,
    }
  );
}
