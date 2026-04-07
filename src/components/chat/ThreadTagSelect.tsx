import { useLayoutEffect, useMemo, useRef } from "react";
import { THREAD_TAG_OPTIONS, threadTagTheme } from "../../features/chat/model/threadTagTheme";

type ThreadTagSelectProps = {
  threadTag: string;
  onChangeThreadTag?: (tag: string) => void;
  /** Доп. класс на обёртку (например, для сжатия в шапке письма). */
  className?: string;
  /** В одну линию с кнопками шапки (36px), как в чате / звонках. */
  variant?: "default" | "toolbar";
};

export function ThreadTagSelect({
  threadTag,
  onChangeThreadTag,
  className,
  variant = "default",
}: ThreadTagSelectProps) {
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

  const widthExtra = variant === "toolbar" ? 40 : 36;

  useLayoutEffect(() => {
    const textW = measureRef.current?.getBoundingClientRect().width ?? 0;
    const el = selectRef.current;
    if (!el || !textW) return;
    const next = Math.min(Math.ceil(textW) + widthExtra, 280);
    el.style.width = `${next}px`;
  }, [selectValue, widthExtra]);

  return (
    <div
      className={[
        "chat-header__thread",
        variant === "toolbar" ? "chat-header__thread--toolbar" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      style={{ display: "flex", alignItems: "center", gap: 8, minWidth: 0 }}
    >
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
  );
}
