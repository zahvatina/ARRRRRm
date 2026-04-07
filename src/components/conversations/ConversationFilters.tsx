import { Badge } from "../ui/Badge";
import { IconButton } from "../ui/IconButton";
import { OperatorMenu } from "../operator/OperatorMenu";

function BellIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M18 8a6 6 0 10-12 0c0 7-3 7-3 7h18s-3 0-3-7"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.73 21a2 2 0 01-3.46 0"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

type ConversationFiltersProps = {
  activeLabel: string;
  activeCount: number;
  collapsed?: boolean;
  onToggleCollapsed?: () => void;
  operator?: {
    name: string;
    role: string;
    photoUrl?: string;
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
          <span style={{ fontWeight: 600, fontSize: 14 }}>{activeLabel}</span>
          <Badge variant="primary">{activeCount}</Badge>
          {operator ? (
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginLeft: 8 }}>
              <IconButton label="Уведомления">
                <BellIcon />
              </IconButton>
              <OperatorMenu name={operator.name} role={operator.role} photoUrl={operator.photoUrl} />
            </div>
          ) : null}
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
