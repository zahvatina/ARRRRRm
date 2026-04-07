import { useEffect, useId, useMemo, useRef, useState } from "react";
import { Avatar } from "../ui/Avatar";

type OperatorStatus = "active" | "noChats" | "inactive";

type OperatorMenuProps = {
  name: string;
  role: string;
  photoUrl?: string;
};

function useOnClickOutside(
  ref: React.RefObject<HTMLElement>,
  handler: () => void,
  when: boolean,
) {
  useEffect(() => {
    if (!when) return;
    const onDown = (e: MouseEvent | TouchEvent) => {
      const el = ref.current;
      if (!el) return;
      if (e.target instanceof Node && el.contains(e.target)) return;
      handler();
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("touchstart", onDown);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("touchstart", onDown);
    };
  }, [handler, ref, when]);
}

function CheckIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M20 6L9 17l-5-5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChevronDownIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M6 9l6 6 6-6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ExitIcon() {
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
        d="M15 12H3"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M21 3h-8a2 2 0 00-2 2v4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11 15v4a2 2 0 002 2h8"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SpeakerIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M11 5L6 9H2v6h4l5 4V5z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M19.07 4.93a10 10 0 010 14.14"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function BugIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M9 9h6m-6 6h6M12 20a4 4 0 004-4V8a4 4 0 00-8 0v8a4 4 0 004 4z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M4 13h4m12 0h4M6 7l3 2m9-2l-3 2M6 19l3-2m9 2l-3-2"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CopyIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
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
      />
    </svg>
  );
}

function statusLabel(s: OperatorStatus) {
  switch (s) {
    case "active":
      return "Активен";
    case "noChats":
      return "Не принимаю чаты";
    case "inactive":
      return "Неактивен";
  }
}

export function OperatorMenu({ name, role, photoUrl }: OperatorMenuProps) {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<OperatorStatus>("active");
  const [soundOn, setSoundOn] = useState(true);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const menuId = useId();

  useOnClickOutside(wrapperRef, () => setOpen(false), open);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const versionText = useMemo(() => "Версия ПО: 6.9.0 / 6.10.0.35386", []);

  return (
    <div ref={wrapperRef} style={{ position: "relative" }}>
      <button
        type="button"
        className="operator-trigger"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((v) => !v)}
        title={`${name} · ${role}`}
      >
        <span className="operator-trigger__avatar">
          <Avatar name={name} src={photoUrl} size="sm" />
        </span>
        <span className="operator-trigger__dot" aria-hidden />
      </button>

      {open ? (
        <div id={menuId} className="operator-menu" role="menu" aria-label="Меню оператора">
          <div className="operator-menu__header">
            <div className="operator-menu__title">ПРОФИЛЬ</div>
            <div className="operator-menu__name">{name}</div>
          </div>

          <div className="operator-menu__section">
            {(["active", "noChats", "inactive"] as const).map((s) => (
              <button
                key={s}
                type="button"
                role="menuitemradio"
                aria-checked={status === s}
                className="operator-menu__row"
                onClick={() => setStatus(s)}
              >
                <span className={`status-dot status-dot--${s}`} aria-hidden />
                <span className="operator-menu__rowText">{statusLabel(s)}</span>
                {s === "inactive" ? (
                  <span className="operator-menu__rowRight" aria-hidden>
                    <ChevronDownIcon />
                  </span>
                ) : status === s ? (
                  <span className="operator-menu__rowRight" aria-hidden>
                    <CheckIcon />
                  </span>
                ) : null}
              </button>
            ))}
          </div>

          <div className="operator-menu__divider" />

          <div className="operator-menu__section">
            <div className="operator-menu__row operator-menu__row--static" role="menuitem">
              <span className="operator-menu__rowIcon" aria-hidden>
                <SpeakerIcon />
              </span>
              <span className="operator-menu__rowText">Звуковое оповещение</span>
              <button
                type="button"
                className={`toggle ${soundOn ? "toggle--on" : ""}`}
                aria-label="Звуковое оповещение"
                onClick={() => setSoundOn((v) => !v)}
              >
                <span className="toggle__thumb" aria-hidden />
              </button>
            </div>

            <button type="button" className="operator-menu__row" role="menuitem">
              <span className="operator-menu__rowIcon" aria-hidden>
                <BugIcon />
              </span>
              <span className="operator-menu__rowText">Журнал ошибок</span>
            </button>

            <div className="operator-menu__row operator-menu__row--static" role="menuitem">
              <span className="operator-menu__rowText operator-menu__version">{versionText}</span>
              <button type="button" className="operator-menu__copy" aria-label="Скопировать версию">
                <CopyIcon />
              </button>
            </div>
          </div>

          <div className="operator-menu__divider" />

          <button type="button" className="operator-menu__row operator-menu__logout" role="menuitem">
            <span className="operator-menu__rowIcon" aria-hidden>
              <ExitIcon />
            </span>
            <span className="operator-menu__rowText">Выход</span>
          </button>
        </div>
      ) : null}
    </div>
  );
}

