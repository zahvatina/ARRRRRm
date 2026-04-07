import type { Conversation } from "../../types/chat";
import { Badge } from "../ui/Badge";
import { ConversationAvatar } from "./ConversationAvatar";
import { ConversationMeta } from "./ConversationMeta";

type ConversationListItemProps = {
  conversation: Conversation;
  selected: boolean;
  onSelect: () => void;
  compact?: boolean;
};

export function ConversationListItem({
  conversation,
  selected,
  onSelect,
  compact = false,
}: ConversationListItemProps) {
  const { customerName, lastPreview, lastTime, unreadCount, avatarUrl } = conversation;

  if (compact) {
    return (
      <button
        type="button"
        onClick={onSelect}
        aria-current={selected ? "true" : undefined}
        title={customerName}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "10px 8px",
          border: selected ? "1px solid var(--color-primary)" : "1px solid transparent",
          borderRadius: 12,
          background: selected ? "#e8eefc" : "transparent",
          cursor: "pointer",
          marginBottom: 6,
          position: "relative",
        }}
      >
        <ConversationAvatar name={customerName} src={avatarUrl} />
        {unreadCount ? (
          <span style={{ position: "absolute", top: 6, right: 6 }}>
            <Badge variant="primary" title="Непрочитанные">
              {unreadCount}
            </Badge>
          </span>
        ) : null}
      </button>
    );
  }

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
