import type { CustomerProfile } from "../../types/chat";
import React from "react";
import {
  ContactChannelModalPortal,
  type ContactChannelModalState,
} from "./ContactChannelModals";

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
        <div style={{ display: "flex", gap: 6, alignItems: "center", flexShrink: 0 }}>{actions}</div>
      ) : null}
    </div>
  );
}

type CustomerProfileCardProps = {
  profile: CustomerProfile;
  onToggleClientSearch?: () => void;
};

function telHref(phone: string) {
  const digits = phone.replace(/[^\d+]/g, "");
  return digits ? `tel:${digits}` : "#";
}

function ChannelIconButton({
  label,
  onClick,
  children,
}: {
  label: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button type="button" className="customer-profile__channel-btn" aria-label={label} title={label} onClick={onClick}>
      {children}
    </button>
  );
}

function ChevronLeftIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

type ProfileAlertSlide = {
  id: string;
  tone: "amber" | "sky";
  title: string;
  text: string;
};

const PROFILE_ALERT_SLIDES: ProfileAlertSlide[] = [
  {
    id: "marketing-opt-out",
    tone: "amber",
    title: "Отключена рекламная рассылка",
    text: "Клиент отозвал согласие на рассылки, необходимо в звонке согласовать с ним возможность отправки уведомлений",
  },
  {
    id: "kasko-renewal",
    tone: "sky",
    title: "Внимание",
    text: "КАСКО истекает через 6 месяцев (15.08.2025). Предложить продление со скидкой 15%",
  },
];

function ImportantAlertsCarousel() {
  const [index, setIndex] = React.useState(0);
  const touchStartX = React.useRef<number | null>(null);
  const n = PROFILE_ALERT_SLIDES.length;

  const go = (dir: -1 | 1) => {
    setIndex((i) => (i + dir + n) % n);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      go(-1);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      go(1);
    }
  };

  const activeTone = PROFILE_ALERT_SLIDES[index]?.tone ?? "amber";

  return (
    <div
      className={`profile-marketing-banner profile-marketing-banner--tone-${activeTone}`}
      role="region"
      aria-label="Важные уведомления"
      aria-roledescription="карусель"
    >
      <div className="profile-marketing-banner__viewport">
        {n > 1 ? (
          <div className="profile-marketing-banner__navSlot">
            <button
              type="button"
              className="profile-marketing-banner__nav"
              onClick={() => go(-1)}
              aria-label="Предыдущее уведомление"
            >
              <ChevronLeftIcon />
            </button>
          </div>
        ) : null}

        <div
          className="profile-marketing-banner__track-shell"
          tabIndex={0}
          onKeyDown={onKeyDown}
          onTouchStart={(e) => {
            touchStartX.current = e.touches[0].clientX;
          }}
          onTouchEnd={(e) => {
            if (touchStartX.current == null) return;
            const x1 = e.changedTouches[0].clientX;
            const d = x1 - touchStartX.current;
            if (d > 56) go(-1);
            else if (d < -56) go(1);
            touchStartX.current = null;
          }}
        >
          <div
            className="profile-marketing-banner__track"
            style={{ transform: `translateX(-${index * 100}%)` }}
            aria-live="polite"
          >
            {PROFILE_ALERT_SLIDES.map((slide) => (
              <div
                key={slide.id}
                className={`profile-marketing-banner__slide profile-marketing-banner__slide--${slide.tone}`}
              >
                <p className="profile-marketing-banner__title">{slide.title}</p>
                <p className="profile-marketing-banner__text">{slide.text}</p>
              </div>
            ))}
          </div>
        </div>

        {n > 1 ? (
          <div className="profile-marketing-banner__navSlot">
            <button
              type="button"
              className="profile-marketing-banner__nav"
              onClick={() => go(1)}
              aria-label="Следующее уведомление"
            >
              <ChevronRightIcon />
            </button>
          </div>
        ) : null}
      </div>

      {n > 1 ? (
        <div className="profile-marketing-banner__dots" role="tablist" aria-label="Выбор уведомления">
          {PROFILE_ALERT_SLIDES.map((slide, i) => (
            <button
              key={slide.id}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={`Уведомление ${i + 1} из ${n}`}
              className={`profile-marketing-banner__dot ${i === index ? "profile-marketing-banner__dot--active" : ""}`}
              onClick={() => setIndex(i)}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}

export function CustomerProfileCard({ profile, onToggleClientSearch }: CustomerProfileCardProps) {
  const [tab, setTab] = React.useState<TabKey>("contacts");
  const [policyFilter, setPolicyFilter] = React.useState<PolicyFilter>("active");
  const [channelModal, setChannelModal] = React.useState<ContactChannelModalState>(null);
  const phone1 = profile.phones[0];
  const phone2 = profile.phones[1];
  const primaryPhone = phone1 ?? phone2;
  const policies = profile.policies ?? [];
  const filteredPolicies = policies.filter((p) => {
    const s = p.status.toLowerCase();
    if (policyFilter === "active") return s.includes("действ");
    if (policyFilter === "offers") return s.includes("оффер") || s.includes("предлож");
    return s.includes("заверш") || s.includes("истек") || s.includes("закрыт");
  });

  return (
    <>
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

      <ImportantAlertsCarousel key={profile.clientId} />

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
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        gap: 8,
                        padding: "4px 0",
                      }}
                    >
                      <div style={{ minWidth: 0 }}>
                        <div style={{ fontSize: 13, fontWeight: 400, lineHeight: 1.25 }}>
                          {phone1.number}{" "}
                          <span style={{ fontSize: 11, color: "var(--color-text-muted)" }}>{phone1.label}</span>
                        </div>
                      </div>
                      <div style={{ display: "flex", gap: 6, alignItems: "center", flexShrink: 0 }}>
                        <ChannelIconButton label="Отправить SMS" onClick={() => setChannelModal({ kind: "sms", to: phone1.number })}>
                          <ChatBubbleIcon />
                        </ChannelIconButton>
                        <a
                          href={telHref(phone1.number)}
                          className="customer-profile__channel-btn"
                          aria-label="Позвонить"
                          title="Позвонить"
                        >
                          <PhoneIcon />
                        </a>
                      </div>
                    </div>
                  ) : null}
                  {phone2 ? (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        gap: 8,
                        padding: "4px 0",
                      }}
                    >
                      <div style={{ minWidth: 0 }}>
                        <div style={{ fontSize: 13, fontWeight: 400, lineHeight: 1.25 }}>
                          {phone2.number}{" "}
                          <span style={{ fontSize: 11, color: "var(--color-text-muted)" }}>{phone2.label}</span>
                        </div>
                      </div>
                      <div style={{ display: "flex", gap: 6, alignItems: "center", flexShrink: 0 }}>
                        <ChannelIconButton label="Отправить SMS" onClick={() => setChannelModal({ kind: "sms", to: phone2.number })}>
                          <ChatBubbleIcon />
                        </ChannelIconButton>
                        <a
                          href={telHref(phone2.number)}
                          className="customer-profile__channel-btn"
                          aria-label="Позвонить"
                          title="Позвонить"
                        >
                          <PhoneIcon />
                        </a>
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
                {primaryPhone ? (
                  <ChannelIconButton
                    label="Отправить SMS на номер клиента"
                    onClick={() => setChannelModal({ kind: "sms", to: primaryPhone.number })}
                  >
                    <ChatBubbleIcon />
                  </ChannelIconButton>
                ) : null}
                <ChannelIconButton
                  label="Отправить e-mail"
                  onClick={() => setChannelModal({ kind: "email", to: profile.email })}
                >
                  <SendIcon />
                </ChannelIconButton>
              </>
            }
          />

          {profile.passport?.registrationAddress ? (
            <ContactRow
              icon={<LocationIcon />}
              primary={
                <span style={{ display: "block", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {profile.passport.registrationAddress}
                </span>
              }
              secondary="Адрес регистрации"
            />
          ) : null}

          <ContactRow
            icon={<LocationIcon />}
            primary={
              <span style={{ display: "block", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {profile.address}
              </span>
            }
            secondary="Адрес"
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
              <div style={{ fontSize: 11, color: "var(--color-text-muted)" }}>
                Кем выдан · Адрес регистрации
              </div>
              <div style={{ marginTop: 2, display: "flex", gap: 10, flexWrap: "wrap" }}>
                <span>{profile.passport.issuedBy}</span>
                <span style={{ color: "var(--color-text-muted)" }}>—</span>
                <span>{profile.passport.registrationAddress}</span>
              </div>
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
    <ContactChannelModalPortal state={channelModal} onClose={() => setChannelModal(null)} />
    </>
  );
}

