import { useId, useState, type ReactNode } from "react";
import { threadTagTheme } from "../../features/chat/model/threadTagTheme";

type AiClassificationPanelProps = {
  threadTag: string;
  /** Ключевые слова дополнительно к тематике треда */
  extraKeywords?: string[];
};

function categoryForThreadTag(tag: string): string {
  switch (tag) {
    case "КАСКО":
    case "Страховой случай":
      return "Запрос статуса страхового случая";
    case "ДМС":
      return "Консультация по программе ДМС";
    case "ОСАГО":
      return "Вопрос по продлению и условиям ОСАГО";
    case "Путешествия":
      return "Изменение условий полиса путешественника";
    case "Ипотека":
      return "Вопрос по ипотечному страхованию";
    default:
      return "Запрос статуса страхового случая";
  }
}

function Row({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="ai-class-row">
      <div className="ai-class-row__label">{label}</div>
      <div className="ai-class-row__value">{children}</div>
    </div>
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

export function AiClassificationPanel({ threadTag, extraKeywords = [] }: AiClassificationPanelProps) {
  const [expanded, setExpanded] = useState(true);
  const bodyId = useId();
  const keywords = Array.from(new Set([threadTag, "страховой случай", ...extraKeywords].filter(Boolean)));
  const category = categoryForThreadTag(threadTag);
  /** Рекомендуемая тематика тега по мнению модели (MVP). */
  const recommendedTag = "ДМС";
  const recTheme = threadTagTheme(recommendedTag);

  return (
    <div className="ai-classification">
      <button
        type="button"
        className="ai-classification__header"
        onClick={() => setExpanded((v) => !v)}
        aria-expanded={expanded}
        aria-controls={bodyId}
        aria-label={expanded ? "Свернуть детали AI-классификации" : "Развернуть детали AI-классификации"}
      >
        <span className="ai-classification__title">AI-классификация</span>
        <span className="ai-classification__chevron" aria-hidden>
          <ChevronIcon up={expanded} />
        </span>
      </button>

      <div className="ai-classification__pinned" aria-live="polite">
        <div className="ai-classification__pinned-line">
          <span className="ai-classification__inline-label">Рекомендуемый тег</span>
          <span
            className="ai-classification__rec-tag"
            style={{
              background: recTheme.bg,
              color: recTheme.color,
              border: `1px solid ${recTheme.border}`,
            }}
          >
            {recommendedTag}
          </span>
          <span className="ai-classification__inline-sep" aria-hidden>
            |
          </span>
          <span className="ai-classification__inline-label">Категория</span>
          <span className="ai-classification__inline-category">{category}</span>
        </div>
      </div>

      <div id={bodyId} className="ai-classification__body" hidden={!expanded}>
        <Row label="Приоритет">Средний</Row>
        <Row label="Тональность">Нейтральный</Row>
        <Row label="Ключевые слова">
          <div className="ai-classification__keywords">
            {keywords.map((k) => (
              <span key={k} className="ai-classification__kw">
                {k}
              </span>
            ))}
          </div>
        </Row>
      </div>
    </div>
  );
}
