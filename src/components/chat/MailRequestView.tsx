import { useState } from "react";
import type { MailThreadDetail } from "../../types/chat";
import { ThreadTagSelect } from "./ThreadTagSelect";

function EnvelopeIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4 4h16v16H4V4z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path d="M4 7l8 6 8-6" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  );
}

function ChevronIcon({ up }: { up: boolean }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      className={up ? "mail-request__chevron mail-request__chevron--up" : "mail-request__chevron"}
    >
      <path
        d="M6 15l6-6 6 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

type MailRequestViewProps = {
  detail: MailThreadDetail;
  threadTag: string;
  onChangeThreadTag?: (tag: string) => void;
};

export function MailRequestView({ detail, threadTag, onChangeThreadTag }: MailRequestViewProps) {
  const [expanded, setExpanded] = useState(true);

  return (
    <div className="mail-request">
      <div className="mail-request__header">
        <div className="mail-request__header-main">
          <div className="mail-request__icon-wrap" aria-hidden>
            <EnvelopeIcon />
          </div>
          <h2 className="mail-request__title">Обработка входящего обращения</h2>
          <ThreadTagSelect
            className="mail-request__thread-tag"
            threadTag={threadTag}
            onChangeThreadTag={onChangeThreadTag}
          />
        </div>
        <div className="mail-request__header-aside">
          <time className="mail-request__time" dateTime={detail.receivedAt}>
            {detail.receivedAt}
          </time>
          <button
            type="button"
            className="mail-request__collapse"
            aria-expanded={expanded}
            onClick={() => setExpanded((v) => !v)}
            aria-label={expanded ? "Свернуть текст обращения" : "Развернуть текст обращения"}
          >
            <ChevronIcon up={expanded} />
          </button>
        </div>
      </div>
      <div className="mail-request__divider" aria-hidden />

      {expanded ? (
        <>
          <div className="mail-request__meta">
            <div className="mail-request__meta-row">
              <span className="mail-request__meta-label">От:</span>
              <span className="mail-request__meta-value">{detail.fromEmail}</span>
            </div>
            <div className="mail-request__meta-row">
              <span className="mail-request__meta-label">Тема:</span>
              <span className="mail-request__meta-value mail-request__meta-value--subject">{detail.subject}</span>
            </div>
          </div>

          <h3 className="mail-request__body-label">Текст обращения</h3>
          <div className="mail-request__body-box">
            <p className="mail-request__body-text">{detail.body}</p>
          </div>
        </>
      ) : null}
    </div>
  );
}
