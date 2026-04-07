import type { Message } from "../../types/chat";
import { MessageMeta } from "./MessageMeta";

type MessageBubbleProps = {
  message: Message;
};

export function MessageBubble({ message }: MessageBubbleProps) {
  const isClient = message.role === "client";
  const bubbleBg = isClient ? "#fff" : "var(--color-bubble-agent)";
  const border = isClient ? "1px solid var(--color-border)" : "1px solid transparent";

  return (
    <div
      style={{
        display: "flex",
        gap: 0,
        alignItems: "flex-start",
        maxWidth: "92%",
        alignSelf: isClient ? "flex-start" : "flex-end",
        flexDirection: "row",
      }}
    >
      <div
        style={{
          background: bubbleBg,
          border,
          borderRadius: 12,
          padding: "12px 14px",
          boxShadow: isClient ? "var(--shadow-soft)" : "none",
        }}
      >
        <MessageMeta authorName={message.authorName} time={message.time} />
        <div style={{ fontSize: 14, lineHeight: 1.5, whiteSpace: "pre-wrap" }}>{message.body}</div>
      </div>
    </div>
  );
}
