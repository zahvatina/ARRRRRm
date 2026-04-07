import { forwardRef, useEffect, useMemo, useRef, useState } from "react";
import { getOperatorHintVariants } from "../../features/chat/model/operatorHints";
import { getReplyTemplates, scoreTemplatesForDialog } from "../../features/chat/model/templateRecommendationScores";
import { SendButton } from "./SendButton";

type ComposerProps = {
  value: string;
  onChange: (v: string) => void;
  onSend: () => void;
  placeholder?: string;
  disabled?: boolean;
  /** Тематика треда и последнее сообщение клиента — для оценки релевантности шаблонов. */
  threadTag?: string;
  lastClientMessage?: string;
};

type ComposerMode = "hint" | "templates";

function HintCloudIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M21 12a8.5 8.5 0 10-4.2 7.3L21 21v-4.1A8.47 8.47 0 0021 12z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="8.5" cy="12" r="1.2" fill="currentColor" />
      <circle cx="12" cy="12" r="1.2" fill="currentColor" />
      <circle cx="15.5" cy="12" r="1.2" fill="currentColor" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M18 6L6 18M6 6l12 12"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export const Composer = forwardRef<HTMLTextAreaElement, ComposerProps>(function Composer(
  { value, onChange, onSend, placeholder = "Введите сообщение...", disabled, threadTag = "Другое", lastClientMessage = "" },
  ref,
) {
  const [mode, setMode] = useState<ComposerMode>("hint");
  const [templatesOpen, setTemplatesOpen] = useState(false);
  const localInputRef = useRef<HTMLTextAreaElement | null>(null);

  const inputRef = (node: HTMLTextAreaElement | null) => {
    localInputRef.current = node;
    if (typeof ref === "function") ref(node);
    else if (ref) ref.current = node;
  };

  const templatesRanked = useMemo(() => {
    const texts = [...getReplyTemplates()];
    const scores = scoreTemplatesForDialog(threadTag, lastClientMessage);
    const rows = texts.map((text, i) => ({ text, matchPct: scores[i] ?? 70 }));
    rows.sort((a, b) => b.matchPct - a.matchPct);
    return rows;
  }, [threadTag, lastClientMessage]);

  const hintVariants = useMemo(
    () => getOperatorHintVariants(threadTag, lastClientMessage),
    [threadTag, lastClientMessage],
  );

  const hintText = hintVariants[0] ?? "";

  const regenerateHint = () => {
    const current = value.trim();
    const options = hintVariants.filter((v) => v.trim() && v.trim() !== current);
    const next = options.length ? options[Math.floor(Math.random() * options.length)] : hintText;
    onChange(next);
    queueMicrotask(() => localInputRef.current?.focus());
  };

  useEffect(() => {
    const el = localInputRef.current;
    if (!el) return;
    // Autosize textarea to fit content.
    el.style.height = "0px";
    el.style.height = `${Math.min(el.scrollHeight, 160)}px`;
  }, [value, mode, templatesOpen]);

  useEffect(() => {
    if (mode !== "templates") setTemplatesOpen(false);
  }, [mode]);

  useEffect(() => {
    if (disabled) return;
    // Фокус в поле при смене режима, чтобы ввод был быстрым.
    localInputRef.current?.focus();
  }, [mode, disabled]);

  const effectivePlaceholder =
    mode === "templates"
      ? "Выберите шаблон ответа…"
      : mode === "hint"
        ? "Подсказка оператору…"
        : placeholder;

  return (
    <form
      className="composer"
      onSubmit={(e) => {
        e.preventDefault();
        if (!disabled && value.trim()) onSend();
      }}
    >
      <div className="composer__modes" role="tablist" aria-label="Режим ввода сообщения">
        <button
          type="button"
          className={`composer-pill ${mode === "hint" ? "composer-pill--active" : ""}`}
          role="tab"
          aria-selected={mode === "hint"}
          onClick={() => setMode("hint")}
          disabled={disabled}
        >
          Подсказка оператору
        </button>

        <button
          type="button"
          className={`composer-pill ${mode === "templates" ? "composer-pill--active" : ""}`}
          role="tab"
          aria-selected={mode === "templates"}
          onClick={() => {
            if (mode === "templates") setTemplatesOpen((v) => !v);
            else {
              setMode("templates");
              setTemplatesOpen(true);
            }
          }}
          disabled={disabled}
        >
          Шаблоны ответов
        </button>
      </div>

      {mode === "templates" && templatesOpen ? (
        <div className="composer-templates" role="listbox" aria-label="Шаблоны ответов">
          {templatesRanked.map(({ text: t, matchPct }) => (
            <button
              key={t}
              type="button"
              className="composer-templates__item"
              role="option"
              onClick={() => {
                onChange(t);
                // Остаёмся на режиме шаблонов (по требованию)
                setTemplatesOpen(false);
                queueMicrotask(() => localInputRef.current?.focus());
              }}
              disabled={disabled}
              aria-label={`Шаблон: совпадение ${matchPct}%. ${t.slice(0, 120)}${t.length > 120 ? "…" : ""}`}
              title={`Совпадение с рекомендациями: ${matchPct}%. Вставить в поле.`}
            >
              <span className="composer-templates__match">{matchPct}%</span>
              <span className="composer-templates__text">{t}</span>
            </button>
          ))}
        </div>
      ) : null}

      <div className="composer__row">
        <textarea
          ref={inputRef}
          value={value}
          disabled={disabled}
          onChange={(e) => onChange(e.target.value)}
          placeholder={effectivePlaceholder}
          aria-label="Текст сообщения"
          className="composer__input"
          rows={1}
        />
        {mode === "hint" ? (
          <div className="composer__actions" aria-label="Действия подсказки">
            <button
              type="button"
              className="composer-action"
              aria-label="Сгенерировать подсказку"
              title="Сгенерировать"
              onClick={regenerateHint}
              disabled={disabled}
            >
              <HintCloudIcon />
            </button>
            <button
              type="button"
              className="composer-action composer-action--danger"
              aria-label="Очистить текст"
              title="Очистить"
              onClick={() => {
                onChange("");
                queueMicrotask(() => localInputRef.current?.focus());
              }}
              disabled={disabled}
            >
              <XIcon />
            </button>
          </div>
        ) : mode === "templates" ? (
          <div className="composer__actions" aria-label="Действия шаблонов">
            <button
              type="button"
              className="composer-action composer-action--danger"
              aria-label="Очистить текст"
              title="Очистить"
              onClick={() => {
                onChange("");
                queueMicrotask(() => localInputRef.current?.focus());
              }}
              disabled={disabled}
            >
              <XIcon />
            </button>
          </div>
        ) : null}
        <SendButton disabled={disabled || !value.trim()} />
      </div>
    </form>
  );
});
