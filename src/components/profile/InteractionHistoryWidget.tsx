import { useMemo, useState } from "react";

type HistoryItem = {
  id: string;
  type: "complaint" | "chat" | "docs" | "call";
  title: string;
  status: { label: string; tone: "orange" | "green" };
  linkId: string;
  linkLabel: string;
  subject: string;
  author: string;
  durationMin?: number;
  dateTime: string; // DD.MM.YYYY HH:mm
};

function LinkIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M10 13a5 5 0 007 0l1-1a5 5 0 00-7-7l-1 1"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14 11a5 5 0 00-7 0l-1 1a5 5 0 007 7l1-1"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
      <path d="M12 7v5l3 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChevronIcon({ up }: { up: boolean }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
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

function ComplaintIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M10.3 3.86l-8.3 14.4A2 2 0 003.74 21h16.52a2 2 0 001.74-2.74l-8.3-14.4a2 2 0 00-3.4 0z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path d="M12 9v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M12 17h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function ChatIcon() {
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

function DocIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M14 2v6h6M16 13H8M16 17H8M10 9H8"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M22 16.92v3a2 2 0 01-2.18 2 19.86 19.86 0 01-8.63-3.07A19.5 19.5 0 014.15 12.8 19.86 19.86 0 011.08 4.18 2 2 0 013.06 2h3a2 2 0 012 1.72c.12.86.32 1.7.59 2.5a2 2 0 01-.45 2.11L7.09 9.91a16 16 0 006.99 6.99l1.58-1.7a2 2 0 012.11-.45c.8.27 1.64.47 2.5.59A2 2 0 0122 16.92z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function iconForType(type: HistoryItem["type"]) {
  switch (type) {
    case "complaint":
      return <ComplaintIcon />;
    case "chat":
      return <ChatIcon />;
    case "docs":
      return <DocIcon />;
    case "call":
      return <PhoneIcon />;
  }
}

export function InteractionHistoryWidget() {
  const items: HistoryItem[] = useMemo(
    () => [
      {
        id: "h1",
        type: "complaint",
        title: "Жалоба",
        status: { label: "В работе", tone: "orange" },
        linkId: "SC-2026-00456",
        linkLabel: "Убыток по КАСКО",
        subject: "Недовольство сроками рассмотрения заявления",
        author: "Иванова М.А.",
        durationMin: 8,
        dateTime: "09.02.2026 14:23",
      },
      {
        id: "h2",
        type: "chat",
        title: "Онлайн-чат",
        status: { label: "Закрыто", tone: "green" },
        linkId: "SC-2026-00456",
        linkLabel: "Убыток по КАСКО",
        subject: "Вопрос по страховому случаю",
        author: "Сидоров П.К.",
        durationMin: 12,
        dateTime: "05.02.2026 11:15",
      },
      {
        id: "h3",
        type: "docs",
        title: "Запрос документов",
        status: { label: "Выполнено", tone: "green" },
        linkId: "ДМС-2025-004567",
        linkLabel: "Полис ДМС",
        subject: "Запрос копии полиса ДМС",
        author: "Автоматически",
        dateTime: "02.02.2026 09:30",
      },
      {
        id: "h4",
        type: "call",
        title: "Исходящий звонок",
        status: { label: "Завершено", tone: "green" },
        linkId: "SC-2026-00123",
        linkLabel: "Убыток по имуществу",
        subject: "Уточнение данных для выплаты",
        author: "Козлова Е.И.",
        durationMin: 5,
        dateTime: "28.01.2026 16:45",
      },
    ],
    [],
  );

  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div className="widget-history">
      <div className="widget-history__chrome-header">
        <h3 className="widget-history__chrome-title">История обращений</h3>
        <span className="widget-history__chrome-range">Последние 30 дней</span>
      </div>

      <div className="widget-history__list">
        {items.map((it) => {
          const open = openId === it.id;
          return (
            <div key={it.id} className="widget-history__card">
              <button
                type="button"
                className="widget-history__card-top"
                onClick={() => setOpenId((v) => (v === it.id ? null : it.id))}
                aria-expanded={open}
                aria-label={open ? `Свернуть ${it.title}` : `Развернуть ${it.title}`}
              >
                <div className={`widget-history__typeIcon widget-history__typeIcon--${it.type}`} aria-hidden>
                  {iconForType(it.type)}
                </div>

                <div className="widget-history__main">
                  <div className="widget-history__titleRow">
                    <div className="widget-history__titleGroup">
                      <span className="widget-history__title">{it.title}</span>
                      <span
                        className={`widget-history__status widget-history__status--${it.status.tone}`}
                        aria-label={`Статус: ${it.status.label}`}
                      >
                        {it.status.label}
                      </span>
                    </div>
                    <div className="widget-history__actions" aria-hidden>
                      <span className="widget-history__action">
                        <LinkIcon />
                      </span>
                      <span className="widget-history__action">
                        <ClockIcon />
                      </span>
                      <span className="widget-history__duration">{typeof it.durationMin === "number" ? `${it.durationMin} мин` : "—"}</span>
                      <span className="widget-history__chevron">
                        <ChevronIcon up={open} />
                      </span>
                    </div>
                  </div>

                  <div className="widget-history__linkRow">
                    <span className="widget-history__money" aria-hidden>
                      $
                    </span>
                    <span className="widget-history__linkId">{it.linkId}</span>
                    <span className="widget-history__dot" aria-hidden>
                      ·
                    </span>
                    <span className="widget-history__linkLabel">{it.linkLabel}</span>
                  </div>

                  <div className="widget-history__subject">{it.subject}</div>

                  <div className="widget-history__metaRow">
                    <span className="widget-history__author">{it.author}</span>
                    <span className="widget-history__datetime">{it.dateTime}</span>
                  </div>
                </div>
              </button>

              {open ? (
                <div className="widget-history__expanded">
                  <div className="widget-history__expandedText">
                    Детали обращения будут отображаться здесь. Сейчас это MVP-разметка по макету.
                  </div>
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}

