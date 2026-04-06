import type { CustomerProfile } from "../../types/chat";
import { EmptyState } from "../ui/EmptyState";
import { CustomerAttributes } from "./CustomerAttributes";
import { CustomerCard } from "./CustomerCard";
import { CustomerContacts } from "./CustomerContacts";

type CustomerProfilePanelProps = {
  profile: CustomerProfile | null;
};

export function CustomerProfilePanel({ profile }: CustomerProfilePanelProps) {
  return (
    <aside className="panel panel--right" aria-label="Профиль клиента">
      <header
        style={{
          padding: "16px 16px 8px",
          fontWeight: 700,
          fontSize: 15,
          borderBottom: "1px solid var(--color-border)",
        }}
      >
        Профиль клиента
      </header>
      {!profile ? (
        <EmptyState title="Нет данных клиента" />
      ) : (
        <>
          <CustomerCard profile={profile} />
          <CustomerContacts profile={profile} />
          <CustomerAttributes profile={profile} />
        </>
      )}
    </aside>
  );
}
