import { useEffect, useState } from "react";
import type { CallSessionInfo, CallTranscriptLine } from "../../types/chat";
import { IconButton } from "../ui/IconButton";
import { MessageMeta } from "./MessageMeta";
import { ThreadTagSelect } from "./ThreadTagSelect";

function formatDuration(total: number): string {
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  return [h, m, s].map((n) => String(n).padStart(2, "0")).join(":");
}

function PhoneHandsetIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M5.5 9.5C6.9 6.2 9.8 4 13 4h1c1.1 0 2 .9 2 2v1c0 .7-.4 1.4-1 1.7l-1.7.9c-.4.2-.6.6-.5 1.1.3 1.2 1.1 2.4 2.2 3.5 1 1 2.2 1.8 3.5 2.1.5.1.9-.1 1.1-.5l.9-1.7c.4-.6 1.1-1 1.7-1h1c1.1 0 2 .9 2 2v1c0 6-8 10-14 6.5-2.6-1.5-4.6-4-5.5-6.5z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function EndCallIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M6 6l12 12M18 6L6 18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function MicIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 14a3 3 0 003-3V6a3 3 0 10-6 0v5a3 3 0 003 3z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
      <path
        d="M19 11a7 7 0 01-14 0M12 18v3M9 21h6"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  );
}

function PauseBarsIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M9 6v12M15 6v12" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
    </svg>
  );
}

function TransferCallIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4 12h11M15 12l3-3M15 12l3 3M20 8V6a2 2 0 00-2-2h-2M10 20h4a2 2 0 002-2v-1"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

type CallsWorkspaceViewProps = {
  session: CallSessionInfo;
  transcript: CallTranscriptLine[];
  threadTag: string;
  onChangeThreadTag?: (tag: string) => void;
  clientLabel?: string;
  agentLabel?: string;
};

export function CallsWorkspaceView({
  session,
  transcript,
  threadTag,
  onChangeThreadTag,
  clientLabel = "Клиент",
  agentLabel = "Оператор",
}: CallsWorkspaceViewProps) {
  const [elapsed, setElapsed] = useState(session.elapsedSeconds ?? 0);

  useEffect(() => {
    setElapsed(session.elapsedSeconds ?? 0);
  }, [session.displayNumber, session.elapsedSeconds]);

  useEffect(() => {
    const t = window.setInterval(() => setElapsed((s) => s + 1), 1000);
    return () => window.clearInterval(t);
  }, []);

  return (
    <div className="call-workspace">
      <header className="call-workspace__header" aria-label="Тематика и управление звонком">
        <div className="call-workspace__header-start">
          <ThreadTagSelect
            variant="toolbar"
            threadTag={threadTag}
            onChangeThreadTag={onChangeThreadTag}
          />
          <span className="call-workspace__timer" aria-live="polite">
            {formatDuration(elapsed)}
          </span>
        </div>
        <div className="call-workspace__header-actions" role="toolbar" aria-label="Управление звонком">
          <button
            type="button"
            className="call-workspace__header-btn call-workspace__header-btn--accept"
            aria-label="Принять звонок"
            title="Принять"
          >
            <PhoneHandsetIcon />
          </button>
          <span className="call-workspace__header-end-wrap">
            <IconButton label="Завершить звонок">
              <EndCallIcon />
            </IconButton>
          </span>
          <IconButton label="Микрофон">
            <MicIcon />
          </IconButton>
          <IconButton label="Удержание">
            <PauseBarsIcon />
          </IconButton>
          <IconButton label="Перевод звонка">
            <TransferCallIcon />
          </IconButton>
        </div>
      </header>

      <div className="call-workspace__transcript-wrap">
        <h3 className="call-workspace__transcript-title">Транскрибация</h3>
        <div className="call-transcript-thread" role="log" aria-live="polite" aria-label="Текст разговора">
          {transcript.map((line, i) => {
            const author = line.speaker === "client" ? clientLabel : agentLabel;
            return (
              <div
                key={`${line.time}-${i}`}
                className={`call-transcript-row call-transcript-row--${line.speaker}`}
              >
                <div className={`call-transcript-bubble call-transcript-bubble--${line.speaker}`}>
                  <MessageMeta authorName={author} time={line.time} />
                  <div className="call-transcript-bubble__text">{line.text}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
