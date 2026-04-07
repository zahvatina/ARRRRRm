import type { Conversation } from "../../types/chat";
import { Badge } from "../ui/Badge";
import { ConversationAvatar } from "./ConversationAvatar";
import { ConversationMeta } from "./ConversationMeta";

type ConversationListItemProps = {
  conversation: Conversation;
  selected: boolean;
  onSelect: () => void;
};

export function ConversationListItem({
  conversation,
  selected,
  onSelect,
}: ConversationListItemProps) {
  const { customerName, lastPreview, lastTime, unreadCount, avatarUrl } = conversation;

  return (
    <button
      type="button"
      onClick={onSelect}
      aria-current={selected ? "true" : undefined}
      style={{
        width: "100%",
        display: "flex",
        alignItems: "flex-start",
        gap: 10,
        padding: "10px 12px",
        border: selected ? "1px solid var(--color-primary)" : "1px solid transparent",
        borderRadius: 10,
        background: selected ? "#e8eefc" : "transparent",
        cursor: "pointer",
        textAlign: "left",
        marginBottom: 4,
      }}
    >
      <ConversationAvatar name={customerName} src={avatarUrl} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 8,
            marginBottom: 4,
          }}
        >
          <span
            style={{
              fontWeight: 600,
              fontSize: 13,
              lineHeight: 1.2,
              whiteSpace: "normal",
              overflowWrap: "anywhere",
              flex: 1,
              minWidth: 0,
            }}
          >
            {customerName}
          </span>
          <ConversationMeta time={lastTime} />
        </div>
        <div
          style={{
            fontSize: 13,
            color: "var(--color-text-muted)",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {lastPreview}
        </div>
      </div>
      {unreadCount ? (
        <span style={{ alignSelf: "center", flexShrink: 0 }}>
          <Badge variant="primary" title="Непрочитанные">
            {unreadCount}
          </Badge>
        </span>
      ) : null}
    </button>
  );
}
