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

type WorkspaceTopBarProps = {
  operator: {
    name: string;
    role: string;
    photoUrl?: string;
  };
};

export function WorkspaceTopBar({ operator }: WorkspaceTopBarProps) {
  return (
    <div className="workspace-topbar" aria-label="Панель рабочей области">
      <div className="workspace-actions">
        <div className="workspace-icon" aria-hidden>
          <IconButton label="Уведомления">
            <BellIcon />
          </IconButton>
        </div>
        <OperatorMenu name={operator.name} role={operator.role} photoUrl={operator.photoUrl} />
      </div>
      <div style={{ flex: 1 }} />
    </div>
  );
}

