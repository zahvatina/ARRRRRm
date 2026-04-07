import type { OperatorInboxChannels } from "../../types/chat";
import { Badge } from "../ui/Badge";
import { OperatorMenu } from "../operator/OperatorMenu";

type ConversationFiltersProps = {
  activeLabel: string;
  activeCount: number;
  collapsed?: boolean;
  onToggleCollapsed?: () => void;
  operator?: {
    name: string;
    role: string;
    photoUrl?: string;
    inboxChannels?: OperatorInboxChannels;
    onInboxChannelsChange?: (next: OperatorInboxChannels) => void;
  };
};

/** MVP: как на макете — только вкладка «Активные» и счётчик. */
export function ConversationFilters({
  activeLabel,
  activeCount,
  collapsed = false,
  onToggleCollapsed,
  operator,
}: ConversationFiltersProps) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: collapsed ? "center" : "space-between",
        gap: 10,
        padding: "16px 16px 12px",
      }}
    >
      {!collapsed ? (
        <div style={{ display: "flex", alignItems: "center", gap: 10, minWidth: 0 }}>
          {operator ? (
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <OperatorMenu
                name={operator.name}
                role={operator.role}
                photoUrl={operator.photoUrl}
                inboxChannels={operator.inboxChannels}
                onInboxChannelsChange={operator.onInboxChannelsChange}
              />
            </div>
          ) : null}
          <span style={{ fontWeight: 600, fontSize: 14 }}>{activeLabel}</span>
          <Badge variant="primary">{activeCount}</Badge>
        </div>
      ) : null}
      <button
        type="button"
        aria-label={collapsed ? "Развернуть список" : "Свернуть список"}
        title={collapsed ? "Развернуть" : "Свернуть"}
        onClick={onToggleCollapsed}
        style={{
          width: 34,
          height: 34,
          borderRadius: 10,
          border: "1px solid var(--color-border)",
          background: "#fff",
          color: "var(--color-text-muted)",
          cursor: "pointer",
          display: "grid",
          placeItems: "center",
        }}
      >
        <span aria-hidden style={{ fontSize: 16, lineHeight: 1 }}>
          {collapsed ? "»" : "«"}
        </span>
      </button>
    </div>
  );
}
