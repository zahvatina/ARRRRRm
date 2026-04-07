import type { CustomerProfile } from "../../types/chat";
import React from "react";

type TabKey = "contacts" | "passport" | "policies";
type PolicyFilter = "active" | "offers" | "completed";

function TabButton({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        border: active ? "1px solid var(--color-border)" : "1px solid transparent",
        background: active ? "#fff" : "transparent",
        color: active ? "var(--color-text)" : "var(--color-text-muted)",
        fontSize: 12,
        fontWeight: 600,
        padding: "8px 10px",
        borderRadius: 10,
        cursor: "pointer",
      }}
    >
      {children}
    </button>
  );
}

function FilterChip({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        border: "1px solid var(--color-border)",
        background: active ? "#e8eefc" : "#fff",
        color: active ? "var(--color-text)" : "var(--color-text-muted)",
        fontSize: 12,
        fontWeight: 600,
        padding: "6px 10px",
        borderRadius: 999,
        cursor: "pointer",
        whiteSpace: "nowrap",
      }}
    >
      {children}
    </button>
  );
}
function PhoneIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M22 16.92v3a2 2 0 01-2.18 2 19.8 19.8 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.8 19.8 0 012 4.18 2 2 0 014 2h3a2 2 0 012 1.72c.12.86.31 1.7.57 2.5a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.58-1.58a2 2 0 012.11-.45c.8.26 1.64.45 2.5.57A2 2 0 0122 16.92z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4 4h16v16H4V4z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M22 6l-10 7L2 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function LocationIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 21s7-4.5 7-11a7 7 0 10-14 0c0 6.5 7 11 7 11z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path d="M12 10a2 2 0 100-4 2 2 0 000 4z" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

function ChatBubbleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M21 15a4 4 0 01-4 4H8l-5 3V7a4 4 0 014-4h10a4 4 0 014 4v8z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SendIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M22 2L11 13"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M22 2L15 22L11 13L2 9L22 2Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Divider() {
  return <div style={{ height: 1, background: "var(--color-border)", margin: "8px 0" }} />;
}

function ContactRow({
  icon,
  primary,
  secondary,
  actions,
}: {
  icon: React.ReactNode;
  primary: React.ReactNode;
  secondary?: React.ReactNode;
  actions?: React.ReactNode;
}) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "6px 0" }}>
      <div style={{ width: 22, color: "var(--color-text-muted)", flexShrink: 0 }}>{icon}</div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 13, fontWeight: 400, lineHeight: 1.25 }}>{primary}</div>
        {secondary ? (
          <div style={{ fontSize: 11, color: "var(--color-text-muted)", marginTop: 2 }}>{secondary}</div>
        ) : null}
      </div>
      {actions ? (
        <div style={{ display: "flex", gap: 10, color: "var(--color-primary)", flexShrink: 0 }}>
          {actions}
        </div>
      ) : null}
    </div>
  );
}

type CustomerProfileCardProps = {
  profile: CustomerProfile;
  onToggleClientSearch?: () => void;
};

export function CustomerProfileCard({ profile, onToggleClientSearch }: CustomerProfileCardProps) {
  const [tab, setTab] = React.useState<TabKey>("contacts");
  const [policyFilter, setPolicyFilter] = React.useState<PolicyFilter>("active");
  const phone1 = profile.phones[0];
  const phone2 = profile.phones[1];
  const policies = profile.policies ?? [];
  const filteredPolicies = policies.filter((p) => {
    const s = p.status.toLowerCase();
    if (policyFilter === "active") return s.includes("действ");
    if (policyFilter === "offers") return s.includes("оффер") || s.includes("предлож");
    return s.includes("заверш") || s.includes("истек") || s.includes("закрыт");
  });

  return (
    <div style={{ padding: "12px 16px", background: "#fff" }}>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12 }}>
        <div style={{ minWidth: 0 }}>
          <div style={{ fontSize: 14, fontWeight: 500, lineHeight: 1.2 }}>{profile.name}</div>
          <div
            style={{
              marginTop: 4,
              display: "flex",
              alignItems: "baseline",
              justifyContent: "space-between",
              gap: 10,
              fontSize: 11,
              color: "var(--color-text-muted)",
            }}
          >
            <span style={{ whiteSpace: "nowrap" }}>ID: {profile.clientId}</span>
            <span style={{ whiteSpace: "nowrap" }}>
              {profile.birthDate} ({profile.age} лет)
            </span>
          </div>
        </div>
        {profile.vip ? (
          <div style={{ marginTop: 6 }}>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "5px 9px",
                borderRadius: 999,
                background: "#eaf7ef",
                color: "#16a34a",
                border: "1px solid #cbead6",
                fontSize: 11,
                fontWeight: 600,
                whiteSpace: "nowrap",
              }}
            >
              <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                <span aria-hidden style={{ fontWeight: 700 }}>
                  ☆
                </span>
                VIP
              </span>
            </span>
          </div>
        ) : null}
        <button
          type="button"
          onClick={onToggleClientSearch}
          style={{
            height: 30,
            padding: "0 10px",
            borderRadius: 10,
            border: "1px solid var(--color-border)",
            background: "#fff",
            color: "var(--color-primary)",
            cursor: "pointer",
            fontSize: 12,
            fontWeight: 600,
            whiteSpace: "nowrap",
            flexShrink: 0,
            marginTop: 2,
          }}
        >
          Сменить клиента
        </button>
      </div>

      <div style={{ marginTop: 10 }}>
        <div
          style={{
            display: "flex",
            gap: 6,
            padding: 4,
            borderRadius: 12,
            background: "var(--color-bg)",
            border: "1px solid var(--color-border)",
            flexWrap: "wrap",
          }}
          role="tablist"
          aria-label="Разделы профиля"
        >
          <TabButton active={tab === "contacts"} onClick={() => setTab("contacts")}>
            Контакты
          </TabButton>
          <TabButton active={tab === "policies"} onClick={() => setTab("policies")}>
            Полисы и договоры
          </TabButton>
          <TabButton active={tab === "passport"} onClick={() => setTab("passport")}>
            Паспортные данные
          </TabButton>
        </div>
      </div>

      <Divider />

      {tab === "contacts" ? (
        <>
          {/* Телефоны — компактно одним блоком */}
          {(phone1 || phone2) ? (
            <div style={{ padding: "4px 0" }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                <div style={{ width: 22, color: "var(--color-text-muted)", marginTop: 2 }}>
                  <PhoneIcon />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  {phone1 ? (
                    <div style={{ display: "flex", justifyContent: "space-between", gap: 10, padding: "4px 0" }}>
                      <div style={{ minWidth: 0 }}>
                        <div style={{ fontSize: 13, fontWeight: 400, lineHeight: 1.25 }}>{phone1.number}</div>
                        <div style={{ fontSize: 11, color: "var(--color-text-muted)", marginTop: 2 }}>
                          {phone1.label}
                        </div>
                      </div>
                    </div>
                  ) : null}
                  {phone2 ? (
                    <div style={{ display: "flex", justifyContent: "space-between", gap: 10, padding: "4px 0" }}>
                      <div style={{ minWidth: 0 }}>
                        <div style={{ fontSize: 13, fontWeight: 400, lineHeight: 1.25 }}>{phone2.number}</div>
                        <div style={{ fontSize: 11, color: "var(--color-text-muted)", marginTop: 2 }}>
                          {phone2.label}
                        </div>
                      </div>
                      <div style={{ display: "flex", gap: 10, color: "var(--color-primary)", flexShrink: 0 }}>
                        <ChatBubbleIcon />
                        <SendIcon />
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          ) : null}

          <ContactRow
            icon={<MailIcon />}
            primary={profile.email}
            actions={
              <>
                <ChatBubbleIcon />
                <SendIcon />
              </>
            }
          />

          <ContactRow
            icon={<LocationIcon />}
            primary={
              <span style={{ display: "block", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {profile.address}
              </span>
            }
          />
        </>
      ) : tab === "passport" ? (
        profile.passport ? (
          <div style={{ fontSize: 13, color: "var(--color-text)" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              <div>
                <div style={{ fontSize: 11, color: "var(--color-text-muted)" }}>Серия</div>
                <div style={{ marginTop: 2 }}>{profile.passport.series}</div>
              </div>
              <div>
                <div style={{ fontSize: 11, color: "var(--color-text-muted)" }}>Номер</div>
                <div style={{ marginTop: 2 }}>{profile.passport.number}</div>
              </div>
              <div>
                <div style={{ fontSize: 11, color: "var(--color-text-muted)" }}>Дата выдачи</div>
                <div style={{ marginTop: 2 }}>{profile.passport.issuedDate}</div>
              </div>
              <div>
                <div style={{ fontSize: 11, color: "var(--color-text-muted)" }}>Код</div>
                <div style={{ marginTop: 2 }}>{profile.passport.code}</div>
              </div>
            </div>
            <div style={{ marginTop: 10 }}>
              <div style={{ fontSize: 11, color: "var(--color-text-muted)" }}>Кем выдан</div>
              <div style={{ marginTop: 2 }}>{profile.passport.issuedBy}</div>
            </div>
            <div style={{ marginTop: 10 }}>
              <div style={{ fontSize: 11, color: "var(--color-text-muted)" }}>Адрес регистрации</div>
              <div style={{ marginTop: 2 }}>{profile.passport.registrationAddress}</div>
            </div>
          </div>
        ) : (
          <div style={{ fontSize: 13, color: "var(--color-text-muted)", padding: "10px 0" }}>
            Нет данных паспорта.
          </div>
        )
      ) : policies.length ? (
        <div style={{ padding: "6px 0" }}>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", paddingBottom: 10 }}>
            <FilterChip active={policyFilter === "active"} onClick={() => setPolicyFilter("active")}>
              Активные
            </FilterChip>
            <FilterChip active={policyFilter === "offers"} onClick={() => setPolicyFilter("offers")}>
              Офферы
            </FilterChip>
            <FilterChip active={policyFilter === "completed"} onClick={() => setPolicyFilter("completed")}>
              Завершенные
            </FilterChip>
          </div>

          <div
            style={{
              maxHeight: 220,
              overflowY: "auto",
              paddingRight: 2,
              display: "flex",
              flexDirection: "column",
              gap: 10,
            }}
          >
            {filteredPolicies.length ? (
              filteredPolicies.map((p) => (
                <div
                  key={p.id}
                  style={{
                    border: "1px solid var(--color-border)",
                    borderRadius: 12,
                    padding: "10px 12px",
                    background: "#fff",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", gap: 10 }}>
                    <div style={{ fontSize: 13, fontWeight: 600 }}>{p.type}</div>
                    <div style={{ fontSize: 12, color: "var(--color-text-muted)" }}>
                      {p.status.toLowerCase().includes("действ") && p.to !== "—"
                        ? `Действует до ${p.to}`
                        : p.status}
                    </div>
                  </div>
                  <div style={{ marginTop: 4, fontSize: 12, color: "var(--color-text-muted)" }}>{p.number}</div>
                  {p.from !== "—" && p.to !== "—" ? (
                    <div style={{ marginTop: 6, fontSize: 12 }}>
                      {p.from} — {p.to}
                    </div>
                  ) : null}
                </div>
              ))
            ) : (
              <div style={{ fontSize: 13, color: "var(--color-text-muted)", padding: "10px 0" }}>
                Нет полисов в выбранном фильтре.
              </div>
            )}
          </div>
        </div>
      ) : (
        <div style={{ fontSize: 13, color: "var(--color-text-muted)", padding: "10px 0" }}>Нет полисов.</div>
      )}

    </div>
  );
}

