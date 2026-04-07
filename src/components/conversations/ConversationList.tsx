import type { Conversation } from "../../types/chat";
import { ConversationListItem } from "./ConversationListItem";

type ConversationListProps = {
  conversations: Conversation[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  compact?: boolean;
};

/** Список с нативным скроллом; при росте данных сюда подключается виртуализация. */
export function ConversationList({ conversations, selectedId, onSelect, compact = false }: ConversationListProps) {
  return (
    <div
      role="list"
      aria-label="Диалоги"
      style={{
        flex: 1,
        overflowY: "auto",
        padding: compact ? "0 10px 12px" : "0 12px 12px",
      }}
    >
      {conversations.map((c) => (
        <div key={c.id} role="listitem">
          <ConversationListItem
            conversation={c}
            selected={c.id === selectedId}
            onSelect={() => onSelect(c.id)}
            compact={compact}
          />
        </div>
      ))}
    </div>
  );
}
