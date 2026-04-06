import type { Message } from "../../types/chat";
import { MessageBubble } from "./MessageBubble";

type MessageGroupProps = {
  messages: Message[];
};

export function MessageGroup({ messages }: MessageGroupProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 12 }}>
      {messages.map((m) => (
        <MessageBubble key={m.id} message={m} />
      ))}
    </div>
  );
}
