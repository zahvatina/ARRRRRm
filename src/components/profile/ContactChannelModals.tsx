import { type ReactNode, useEffect, useId, useRef } from "react";
import { createPortal } from "react-dom";

export type ContactChannelModalState =
  | { kind: "email"; to: string }
  | { kind: "sms"; to: string }
  | null;

const EMAIL_TEMPLATES = [
  { value: "", label: "— Выберите шаблон или заполните вручную —" },
  { value: "policy", label: "Уведомление по полису" },
  { value: "renewal", label: "Напоминание о продлении" },
  { value: "thanks", label: "Благодарность за обращение" },
] as const;

const SMS_TEMPLATES = [
  { value: "", label: "— Выберите шаблон или введите текст —" },
  { value: "code", label: "Код подтверждения" },
  { value: "reminder", label: "Краткое напоминание" },
] as const;

function CloseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function EnvelopeOutlineIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.8" />
      <path d="M3 7l9 6 9-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PhoneOutlineIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M22 16.92v3a2 2 0 01-2.18 2 19.8 19.8 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.8 19.8 0 013 4.18 2 2 0 015 2h3a2 2 0 012 1.72v0c.09.67.24 1.33.45 1.96L9.31 8.16a16 16 0 006.53 6.53l2.48-2.14c.63.21 1.29.36 1.96.45A2 2 0 0122 16.92z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PaperclipIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

type ModalShellProps = {
  title: string;
  onClose: () => void;
  children: ReactNode;
};

function ModalShell({ title, onClose, children }: ModalShellProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      className="contact-channel-modal__backdrop"
      role="presentation"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={panelRef}
        className="contact-channel-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="contact-channel-modal-title"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <header className="contact-channel-modal__header">
          <h2 id="contact-channel-modal-title" className="contact-channel-modal__title">
            {title}
          </h2>
          <button type="button" className="contact-channel-modal__close" onClick={onClose} aria-label="Закрыть">
            <CloseIcon />
          </button>
        </header>
        {children}
      </div>
    </div>
  );
}

type EmailModalProps = {
  to: string;
  onClose: () => void;
};

function EmailComposeModal({ to, onClose }: EmailModalProps) {
  const subjectId = useId();
  const bodyId = useId();
  const templateId = useId();
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <ModalShell title="Отправка e-mail" onClose={onClose}>
      <div className="contact-channel-modal__body">
        <div className="contact-channel-modal__recipient">
          <span className="contact-channel-modal__recipient-icon" aria-hidden>
            <EnvelopeOutlineIcon />
          </span>
          <span className="contact-channel-modal__recipient-text">
            Получатель: <strong>{to}</strong>
          </span>
        </div>

        <label className="contact-channel-modal__label" htmlFor={templateId}>
          Выберите шаблон
        </label>
        <select id={templateId} className="contact-channel-modal__select" defaultValue="">
          {EMAIL_TEMPLATES.map((o) => (
            <option key={o.value || "empty"} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>

        <label className="contact-channel-modal__label" htmlFor={subjectId}>
          Тема письма
        </label>
        <input
          id={subjectId}
          type="text"
          className="contact-channel-modal__input"
          placeholder="Введите тему письма…"
        />

        <label className="contact-channel-modal__label" htmlFor={bodyId}>
          Текст письма
        </label>
        <textarea
          id={bodyId}
          className="contact-channel-modal__textarea"
          placeholder="Введите текст письма…"
          rows={5}
        />

        <input ref={fileInputRef} type="file" multiple className="contact-channel-modal__file-input" />

        <button
          type="button"
          className="contact-channel-modal__attach"
          onClick={() => fileInputRef.current?.click()}
        >
          <PaperclipIcon />
          Прикрепить файлы
        </button>

        <div className="contact-channel-modal__footer">
          <button type="button" className="contact-channel-modal__btn contact-channel-modal__btn--muted" onClick={onClose}>
            Отмена
          </button>
          <button
            type="button"
            className="contact-channel-modal__btn contact-channel-modal__btn--primary"
            onClick={onClose}
          >
            Отправить
          </button>
        </div>
      </div>
    </ModalShell>
  );
}

type SmsModalProps = {
  to: string;
  onClose: () => void;
};

function SmsComposeModal({ to, onClose }: SmsModalProps) {
  const textId = useId();
  const templateId = useId();

  return (
    <ModalShell title="Отправка SMS" onClose={onClose}>
      <div className="contact-channel-modal__body">
        <div className="contact-channel-modal__recipient contact-channel-modal__recipient--sms">
          <span className="contact-channel-modal__recipient-icon" aria-hidden>
            <PhoneOutlineIcon />
          </span>
          <span className="contact-channel-modal__recipient-text">
            Получатель: <strong>{to}</strong>
          </span>
        </div>

        <label className="contact-channel-modal__label" htmlFor={templateId}>
          Выберите шаблон
        </label>
        <select id={templateId} className="contact-channel-modal__select" defaultValue="">
          {SMS_TEMPLATES.map((o) => (
            <option key={o.value || "empty"} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>

        <label className="contact-channel-modal__label" htmlFor={textId}>
          Текст сообщения
        </label>
        <textarea
          id={textId}
          className="contact-channel-modal__textarea"
          placeholder="Введите текст SMS…"
          rows={5}
        />

        <div className="contact-channel-modal__footer">
          <button type="button" className="contact-channel-modal__btn contact-channel-modal__btn--muted" onClick={onClose}>
            Отмена
          </button>
          <button
            type="button"
            className="contact-channel-modal__btn contact-channel-modal__btn--primary"
            onClick={onClose}
          >
            Отправить
          </button>
        </div>
      </div>
    </ModalShell>
  );
}

type ContactChannelModalPortalProps = {
  state: ContactChannelModalState;
  onClose: () => void;
};

export function ContactChannelModalPortal({ state, onClose }: ContactChannelModalPortalProps) {
  if (!state || typeof document === "undefined") return null;

  return createPortal(
    state.kind === "email" ? (
      <EmailComposeModal to={state.to} onClose={onClose} />
    ) : (
      <SmsComposeModal to={state.to} onClose={onClose} />
    ),
    document.body,
  );
}
