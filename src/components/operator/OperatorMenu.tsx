import { useEffect, useId, useMemo, useRef, useState } from "react";
import type { OperatorInboxChannel, OperatorInboxChannels } from "../../types/chat";
import {
  DEFAULT_OPERATOR_INBOX,
  OPERATOR_CHANNEL_LABELS,
} from "../../features/chat/model/operatorInbox";
import { Avatar } from "../ui/Avatar";

type OperatorStatus = "active" | "noChats" | "inactive";

const CHANNEL_ORDER: OperatorInboxChannel[] = ["chat", "tickets", "calls", "mail"];

type OperatorMenuProps = {
  name: string;
  role: string;
  photoUrl?: string;
  /** Управляемый фильтр каналов очереди (если не передан — локальное состояние). */
  inboxChannels?: OperatorInboxChannels;
  onInboxChannelsChange?: (next: OperatorInboxChannels) => void;
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

export function OperatorMenu({
  name,
  role,
  photoUrl,
  inboxChannels: inboxProp,
  onInboxChannelsChange,
}: OperatorMenuProps) {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<OperatorStatus>("active");
  const [soundOn, setSoundOn] = useState(true);
  const [internalInbox, setInternalInbox] = useState<OperatorInboxChannels>(DEFAULT_OPERATOR_INBOX);
  const inbox = inboxProp ?? internalInbox;

  const setInbox = (next: OperatorInboxChannels) => {
    if (onInboxChannelsChange) onInboxChannelsChange(next);
    else setInternalInbox(next);
  };

  const toggleInboxChannel = (key: OperatorInboxChannel) => {
    const next = { ...inbox, [key]: !inbox[key] };
    if (!Object.values(next).some(Boolean)) return;
    setInbox(next);
  };
  const wrapperRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuId = useId();
  const [menuPos, setMenuPos] = useState<{ top: number; left: number; origin: "top" | "bottom" } | null>(null);

  useOnClickOutside(wrapperRef, () => setOpen(false), open);

  useEffect(() => {
    if (!open) return;

    const recompute = () => {
      const trigger = triggerRef.current;
      const menu = menuRef.current;
      if (!trigger || !menu) return;

      const rect = trigger.getBoundingClientRect();
      const menuRect = menu.getBoundingClientRect();
      const gap = 10;
      const viewportPad = 8;

      // Horizontal: align right edge with trigger, but keep inside viewport.
      let left = rect.right - menuRect.width;
      left = Math.max(viewportPad, Math.min(left, window.innerWidth - menuRect.width - viewportPad));

      // Vertical: open down by default; if not enough room, flip up.
      let top = rect.bottom + gap;
      let origin: "top" | "bottom" = "top";
      if (top + menuRect.height > window.innerHeight - viewportPad) {
        top = rect.top - gap - menuRect.height;
        origin = "bottom";
      }
      top = Math.max(viewportPad, Math.min(top, window.innerHeight - menuRect.height - viewportPad));

      setMenuPos({ top, left, origin });
    };

    // Wait a frame so the menu is in DOM and measurable.
    const raf = requestAnimationFrame(recompute);
    window.addEventListener("resize", recompute);
    window.addEventListener("scroll", recompute, true);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", recompute);
      window.removeEventListener("scroll", recompute, true);
    };
  }, [open]);

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
        ref={triggerRef}
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
        <div
          id={menuId}
          ref={menuRef}
          className="operator-menu"
          role="menu"
          aria-label="Меню оператора"
          style={
            menuPos
              ? {
                  position: "fixed",
                  top: menuPos.top,
                  left: menuPos.left,
                  transformOrigin: menuPos.origin === "top" ? "top right" : "bottom right",
                  zIndex: 1000,
                }
              : { position: "fixed", top: 0, left: 0, opacity: 0, pointerEvents: "none", zIndex: 1000 }
          }
        >
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
                {status === s && s !== "inactive" ? (
                  <span className="operator-menu__rowRight" aria-hidden>
                    <CheckIcon />
                  </span>
                ) : null}
              </button>
            ))}
          </div>

          <div className="operator-menu__divider" />

          <div className="operator-menu__section">
            <div className="operator-menu__section-label">Каналы приёма</div>
            <div className="operator-menu__channels" role="group" aria-label="Каналы очереди">
              {CHANNEL_ORDER.map((key) => (
                <button
                  key={key}
                  type="button"
                  role="menuitemcheckbox"
                  aria-checked={inbox[key]}
                  className={`operator-menu__channel ${inbox[key] ? "operator-menu__channel--on" : ""}`}
                  onClick={() => toggleInboxChannel(key)}
                >
                  {OPERATOR_CHANNEL_LABELS[key]}
                </button>
              ))}
            </div>
            <p className="operator-menu__channels-hint">
              Выберите чат, заявки, звонки и/или почту — список слева показывает обращения по отмеченным
              каналам.
            </p>
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

