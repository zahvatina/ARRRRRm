import { useEffect, useRef, useState } from "react";
import type { CustomerProfile } from "../../types/chat";
import { EmptyState } from "../ui/EmptyState";
import { Input } from "../ui/Input";
import { CustomerProfileCard } from "./CustomerProfileCard";
import { WidgetsWorkspace } from "./WidgetsWorkspace";

type CustomerProfilePanelProps = {
  profile: CustomerProfile | null;
};

function SearchIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M21 21l-4.35-4.35"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11 19a8 8 0 100-16 8 8 0 000 16z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function CustomerProfilePanel({ profile }: CustomerProfilePanelProps) {
  const [clientSearchOpen, setClientSearchOpen] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!clientSearchOpen) return;
    searchRef.current?.focus();
  }, [clientSearchOpen]);

  return (
    <aside className="panel panel--right" aria-label="Профиль клиента">
      {clientSearchOpen ? (
        <div style={{ padding: "12px 16px", borderBottom: "1px solid var(--color-border)" }}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
            style={{ position: "relative" }}
          >
            <Input
              ref={searchRef}
              placeholder="Поиск клиента"
              aria-label="Поиск клиента"
              style={{ paddingRight: 44 }}
            />
            <button
              type="submit"
              aria-label="Искать"
              title="Искать"
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                width: 44,
                height: 44,
                border: "none",
                background: "transparent",
                color: "var(--color-text-muted)",
                cursor: "pointer",
                display: "grid",
                placeItems: "center",
              }}
            >
              <SearchIcon />
            </button>
          </form>
        </div>
      ) : null}
      <div style={{ flex: 1, minHeight: 0, overflowY: "auto" }}>
        {!profile ? (
          <EmptyState title="Нет данных клиента" />
        ) : (
          <>
            <CustomerProfileCard
              profile={profile}
              onToggleClientSearch={() => setClientSearchOpen((v) => !v)}
            />
            <WidgetsWorkspace key={profile.clientId} />
          </>
        )}
      </div>
    </aside>
  );
}
