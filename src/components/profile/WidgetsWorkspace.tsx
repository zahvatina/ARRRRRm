import { useState } from "react";
import { Input } from "../ui/Input";

type WidgetDef = {
  id: string;
  title: string;
  keywords: string[];
};

// Каталог виджетов будет добавлен следующим шагом (поиск сейчас только UI).

function CloseIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function Tab({
  active,
  title,
  onSelect,
  onClose,
}: {
  active: boolean;
  title: string;
  onSelect: () => void;
  onClose: () => void;
}) {
  return (
    <div
      role="tab"
      aria-selected={active}
      onClick={onSelect}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        padding: "6px 10px",
        borderRadius: 10,
        border: `1px solid ${active ? "var(--color-border)" : "transparent"}`,
        background: active ? "#fff" : "transparent",
        cursor: "pointer",
        maxWidth: 220,
      }}
    >
      <span
        style={{
          fontSize: 12,
          color: active ? "var(--color-text)" : "var(--color-text-muted)",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {title}
      </span>
      <button
        type="button"
        aria-label={`Закрыть вкладку ${title}`}
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        style={{
          border: "none",
          background: "transparent",
          padding: 2,
          cursor: "pointer",
          color: "var(--color-text-muted)",
          display: "grid",
          placeItems: "center",
          flexShrink: 0,
        }}
      >
        <CloseIcon />
      </button>
    </div>
  );
}

export function WidgetsWorkspace() {
  const [query, setQuery] = useState("");
  const [openTabs, setOpenTabs] = useState<WidgetDef[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);

  const activeTab = openTabs.find((t) => t.id === activeId) ?? null;

  const closeWidget = (id: string) => {
    setOpenTabs((prev) => {
      const idx = prev.findIndex((t) => t.id === id);
      const next = prev.filter((t) => t.id !== id);
      if (activeId === id) {
        const fallback = next[idx - 1] ?? next[idx] ?? null;
        setActiveId(fallback?.id ?? null);
      }
      return next;
    });
  };

  return (
    <section style={{ padding: "10px 16px 14px" }}>
      <div style={{ fontSize: 12, fontWeight: 600, color: "var(--color-text-muted)", marginBottom: 8 }}>
        Поиск по виджетам
      </div>
      <Input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Начните вводить название виджета…"
        aria-label="Поиск по виджетам"
        style={{ padding: "10px 12px" }}
      />

      <div style={{ marginTop: 12 }}>
        <div
          role="tablist"
          aria-label="Открытые виджеты"
          style={{
            display: "flex",
            gap: 6,
            flexWrap: "wrap",
          }}
        >
          {openTabs.map((t) => (
            <Tab
              key={t.id}
              active={t.id === activeId}
              title={t.title}
              onSelect={() => setActiveId(t.id)}
              onClose={() => closeWidget(t.id)}
            />
          ))}
        </div>

        <div style={{ marginTop: 10, minHeight: 88 }}>
          {activeTab ? (
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 6 }}>{activeTab.title}</div>
              <div style={{ fontSize: 12, color: "var(--color-text-muted)" }}>
                Здесь будет содержимое виджета «{activeTab.title}». Сейчас это заглушка.
              </div>
            </div>
          ) : (
            <div />
          )}
        </div>
      </div>
    </section>
  );
}

