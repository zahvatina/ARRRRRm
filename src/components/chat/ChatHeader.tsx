import { useLayoutEffect, useMemo, useRef } from "react";
import { THREAD_TAG_OPTIONS, threadTagTheme } from "../../features/chat/model/threadTagTheme";
import { IconButton } from "../ui/IconButton";

type ChatHeaderProps = {
  threadTag: string;
  onChangeThreadTag?: (tag: string) => void;
};

function TransferThreadIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M10 17l5-5-5-5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15 12H4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CopyIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M8 8h12v12H8V8z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M4 16H3a1 1 0 01-1-1V4a1 1 0 011-1h11a1 1 0 011 1v1"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function NoteIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
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

function CloseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M18 6L6 18M6 6l12 12"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 11a4 4 0 100-8 4 4 0 000 8z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ChatHeader({ threadTag, onChangeThreadTag }: ChatHeaderProps) {
  const theme = threadTagTheme(threadTag);
  const selectValue = THREAD_TAG_OPTIONS.includes(threadTag as (typeof THREAD_TAG_OPTIONS)[number])
    ? threadTag
    : "Другое";
  const selectRef = useRef<HTMLSelectElement>(null);
  const measureRef = useRef<HTMLSpanElement>(null);

  const chevronUrl = useMemo(() => {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="${theme.color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg>`;
    return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
  }, [theme.color]);

  useLayoutEffect(() => {
    const textW = measureRef.current?.getBoundingClientRect().width ?? 0;
    const el = selectRef.current;
    if (!el || !textW) return;
    // padding 10+22 + оценка бордера; верхняя граница длины длинных тематик
    const next = Math.min(Math.ceil(textW) + 36, 280);
    el.style.width = `${next}px`;
  }, [selectValue]);

  return (
    <header
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "14px 16px",
        borderBottom: "1px solid var(--color-border)",
        background: "#fff",
      }}
    >
      <div className="chat-header__thread" style={{ display: "flex", alignItems: "center", gap: 8, minWidth: 0 }}>
        <span ref={measureRef} className="chat-header__thread-measure" aria-hidden>
          {selectValue}
        </span>
        <select
          ref={selectRef}
          value={selectValue}
          aria-label="Тематика треда"
          title={threadTag}
          onChange={(e) => onChangeThreadTag?.(e.target.value)}
          className="chat-header__thread-select chat-header__thread-select--badge"
          style={{
            backgroundColor: theme.bg,
            color: theme.color,
            border: `1px solid ${theme.border}`,
            backgroundImage: chevronUrl,
          }}
        >
          {THREAD_TAG_OPTIONS.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>
      <div style={{ display: "flex", gap: 8 }}>
        <IconButton label="Перевести тред">
          <TransferThreadIcon />
        </IconButton>
        <IconButton label="Копировать">
          <CopyIcon />
        </IconButton>
        <IconButton label="Заметка">
          <NoteIcon />
        </IconButton>
        <IconButton label="Профиль">
          <UserIcon />
        </IconButton>
        <span style={{ color: "#e87575" }}>
          <IconButton label="Закрыть">
            <CloseIcon />
          </IconButton>
        </span>
      </div>
    </header>
  );
}
