type StatPair = { left: string; right: string };

type QueueStatsFooterProps = {
  title?: string;
  stats: StatPair[];
};

export function QueueStatsFooter({ title = "Статистика", stats }: QueueStatsFooterProps) {
  return (
    <footer
      style={{
        borderTop: "1px solid var(--color-border)",
        padding: "12px 16px",
        background: "#fafbfd",
      }}
    >
      <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 8, color: "var(--color-text-muted)" }}>
        {title}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", gap: 8 }}>
        {stats.map((s) => (
          <div
            key={`${s.left}-${s.right}`}
            style={{
              flex: 1,
              textAlign: "center",
              fontSize: 13,
              fontWeight: 600,
              color: "var(--color-text)",
            }}
          >
            {s.left} / {s.right}
          </div>
        ))}
      </div>
    </footer>
  );
}
