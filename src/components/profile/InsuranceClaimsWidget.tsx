import { useState } from "react";

type TimelineItem = {
  id: string;
  title: string;
  datetime: string;
  actor: string;
  active?: boolean;
};

type ClaimMock = {
  key: string;
  claimId: string;
  sub: string;
  date: string;
  status: string;
  amount: string;
  timeline: TimelineItem[];
};

const MOCK_CLAIMS: ClaimMock[] = [
  {
    key: "c1",
    claimId: "УБ-2026-001234",
    sub: "КАСКО • ДТП на ул. Тверская",
    date: "01.02.2026",
    status: "На рассмотрении",
    amount: "125\u00A0000\u00A0₽",
    timeline: [
      { id: "1", title: "Заявление принято", datetime: "01.02.2026 10:30", actor: "Система" },
      { id: "2", title: "Документы проверены", datetime: "01.02.2026 14:15", actor: "Эксперт Смирнов А.И." },
      { id: "3", title: "Назначен осмотр ТС", datetime: "02.02.2026 09:00", actor: "Эксперт Смирнов А.И." },
      { id: "4", title: "Осмотр проведен", datetime: "05.02.2026 16:20", actor: "Оценщик Волков П.П." },
      {
        id: "5",
        title: "Расчет суммы выплаты",
        datetime: "09.02.2026 15:30",
        actor: "Эксперт Смирнов А.И.",
        active: true,
      },
    ],
  },
  {
    key: "c2",
    claimId: "УБ-2026-001198",
    sub: "ОСАГО • Столкновение на МКАД, п. 58 км",
    date: "18.01.2026",
    status: "Выплата",
    amount: "87\u00A0500\u00A0₽",
    timeline: [
      { id: "1", title: "Уведомление получено", datetime: "18.01.2026 08:40", actor: "Клиент (ЛК)" },
      { id: "2", title: "Справки ГИБДД запрошены", datetime: "18.01.2026 11:00", actor: "Система" },
      {
        id: "3",
        title: "Резерв согласован, направлена выплата",
        datetime: "22.01.2026 17:05",
        actor: "Урегулирование ОСАГО",
        active: true,
      },
    ],
  },
  {
    key: "c3",
    claimId: "УБ-2026-000967",
    sub: "КАСКО • Повреждение на парковке ТЦ",
    date: "03.12.2025",
    status: "Закрыт",
    amount: "42\u00A0000\u00A0₽",
    timeline: [
      { id: "1", title: "Заявление принято", datetime: "03.12.2025 09:15", actor: "КЦ" },
      { id: "2", title: "Осмотр по фото", datetime: "04.12.2025 14:00", actor: "Эксперт Данилова Е.В." },
      {
        id: "3",
        title: "Выплата произведена",
        datetime: "11.12.2025 12:00",
        actor: "Расчётный отдел",
        active: true,
      },
    ],
  },
];

function ClockIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="9" stroke="#ea580c" strokeWidth="2" />
      <path d="M12 7v5l3 2" stroke="#ea580c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChevronIcon({ up }: { up: boolean }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden className="widget-claims__chevron-svg">
      <path
        d={up ? "M18 15l-6-6-6 6" : "M6 9l6 6 6-6"}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const CLAIMS_COUNT = MOCK_CLAIMS.length;

function ClaimCard({
  claim,
  expanded,
  onToggle,
}: {
  claim: ClaimMock;
  expanded: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="widget-claims__card widget-claims__card--in-shell">
      <button
        type="button"
        className="widget-claims__card-top"
        onClick={onToggle}
        aria-expanded={expanded}
        aria-label={expanded ? `Свернуть ${claim.claimId}` : `Развернуть ${claim.claimId}`}
      >
        <div className="widget-claims__card-left">
          <span className="widget-claims__clock" aria-hidden>
            <ClockIcon />
          </span>
          <div className="widget-claims__card-main">
            <div className="widget-claims__id-row">
              <span className="widget-claims__claim-id">{claim.claimId}</span>
            </div>
            <div className="widget-claims__sub">{claim.sub}</div>
            <div className="widget-claims__date-muted">{claim.date}</div>
          </div>
        </div>
        <div className="widget-claims__card-right">
          <div className="widget-claims__status-row">
            <span className="widget-claims__status-badge">{claim.status}</span>
            <span className="widget-claims__chevron" aria-hidden>
              <ChevronIcon up={expanded} />
            </span>
          </div>
          <div className="widget-claims__amount">{claim.amount}</div>
        </div>
      </button>

      {expanded ? (
        <>
          <div className="widget-claims__divider" />
          <div className="widget-claims__history">
            <div className="widget-claims__history-title">История рассмотрения:</div>
            <ul className="widget-claims__timeline">
              {claim.timeline.map((item, idx) => (
                <li
                  key={`${claim.key}-${item.id}`}
                  className={`widget-claims__tline-item ${item.active ? "widget-claims__tline-item--active" : ""}`}
                >
                  <div className="widget-claims__tline-rail">
                    <span
                      className={`widget-claims__tline-dot ${item.active ? "widget-claims__tline-dot--active" : ""}`}
                    />
                    {idx < claim.timeline.length - 1 ? <span className="widget-claims__tline-line" /> : null}
                  </div>
                  <div className="widget-claims__tline-body">
                    <div className="widget-claims__tline-title">{item.title}</div>
                    <div className="widget-claims__tline-meta">
                      {item.datetime}
                      <span className="widget-claims__tline-sep">·</span>
                      {item.actor}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </>
      ) : null}
    </div>
  );
}

export function InsuranceClaimsWidget() {
  const [expanded, setExpanded] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(MOCK_CLAIMS.map((c, i) => [c.key, i === 0])),
  );

  const toggle = (key: string) => {
    setExpanded((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="widget-claims">
      <div className="widget-claims__chrome-header">
        <h3 className="widget-claims__chrome-title">Страховые случаи и убытки</h3>
        <span className="widget-claims__chrome-count">{CLAIMS_COUNT} обращений</span>
      </div>

      <div className="widget-casco-form__card widget-casco-form__card--list">
        {MOCK_CLAIMS.map((claim) => (
          <ClaimCard
            key={claim.key}
            claim={claim}
            expanded={Boolean(expanded[claim.key])}
            onToggle={() => toggle(claim.key)}
          />
        ))}
      </div>
    </div>
  );
}
