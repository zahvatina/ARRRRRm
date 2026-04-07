import { useMemo } from "react";
import { formatRuDayMonth } from "../../features/chat/model/formatCalendarDate";
import type { Message } from "../../types/chat";
import { AiClassificationPanel } from "./AiClassificationPanel";
import { MessageGroup } from "./MessageGroup";

const DEFAULT_CALENDAR_DATE = "07.04.2026";

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

function chunkByCalendarDate(messages: Message[]): { dateKey: string; messages: Message[] }[] {
  const chunks: { dateKey: string; messages: Message[] }[] = [];
  for (const m of messages) {
    const d = m.calendarDate ?? DEFAULT_CALENDAR_DATE;
    const prev = chunks[chunks.length - 1];
    if (!prev || prev.dateKey !== d) {
      chunks.push({ dateKey: d, messages: [m] });
    } else {
      prev.messages.push(m);
    }
  }
  return chunks;
}

function extraKeywordsFromChunk(chunk: { messages: Message[] }): string[] {
  const text = chunk.messages
    .filter((m) => m.role === "client")
    .map((m) => m.body)
    .join(" ")
    .toLowerCase();
  const out: string[] = [];
  if (text.includes("дтп")) out.push("ДТП");
  if (text.includes("осмотр") || text.includes("оценщик")) out.push("осмотр");
  if (text.includes("франшиз")) out.push("франшиза");
  return out;
}

type MessageThreadProps = {
  messages: Message[];
  threadTag: string;
};

export function MessageThread({ messages, threadTag }: MessageThreadProps) {
  const dayChunks = useMemo(() => chunkByCalendarDate(messages), [messages]);

  return (
    <div
      role="log"
      aria-live="polite"
      className="message-thread"
      style={{
        flex: 1,
        overflowY: "auto",
        padding: "12px 20px 16px",
        display: "flex",
        flexDirection: "column",
        gap: 6,
      }}
    >
      {dayChunks.length === 0 ? (
        <div style={{ fontSize: 13, color: "var(--color-text-muted)", padding: "24px 0" }}>
          Нет сообщений в этом диалоге.
        </div>
      ) : (
        dayChunks.map((chunk) => {
          const groups = groupMessages(chunk.messages);
          const extraKw = extraKeywordsFromChunk(chunk);
          return (
            <section key={chunk.dateKey} className="message-thread__day" aria-label={`Диалог за ${chunk.dateKey}`}>
              <div className="message-thread__date-divider" role="separator">
                <span className="message-thread__date-label">{formatRuDayMonth(chunk.dateKey)}</span>
              </div>

              <AiClassificationPanel threadTag={threadTag} extraKeywords={extraKw} />

              <div className="message-thread__bubbles">
                {groups.map((group, idx) => (
                  <MessageGroup key={`${chunk.dateKey}-${group[0].id}-${idx}`} messages={group} />
                ))}
              </div>
            </section>
          );
        })
      )}
    </div>
  );
}
