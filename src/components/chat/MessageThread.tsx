import type { Message } from "../../types/chat";
import { MessageGroup } from "./MessageGroup";

function groupMessages(messages: Message[]): Message[][] {
  const groups: Message[][] = [];
  for (const m of messages) {
    const last = groups[groups.length - 1];
    if (last && last[0].authorName === m.authorName && last[0].role === m.role) {
      last.push(m);
    } else {
      groups.push([m]);
    }
  }
  return groups;
}

type MessageThreadProps = {
  messages: Message[];
};

export function MessageThread({ messages }: MessageThreadProps) {
  const groups = groupMessages(messages);

  return (
    <div
      role="log"
      aria-live="polite"
      style={{
        flex: 1,
        overflowY: "auto",
        padding: "16px 20px",
        display: "flex",
        flexDirection: "column",
        gap: 4,
      }}
    >
      {groups.length === 0 ? (
        <div style={{ fontSize: 13, color: "var(--color-text-muted)", padding: "24px 0" }}>
          Нет сообщений в этом диалоге.
        </div>
      ) : (
        groups.map((group, idx) => (
          <MessageGroup key={`${group[0].id}-${idx}`} messages={group} />
        ))
      )}
    </div>
  );
}
