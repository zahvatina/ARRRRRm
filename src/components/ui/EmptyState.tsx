type EmptyStateProps = {
  title: string;
  description?: string;
};

export function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <div
      style={{
        padding: "32px 16px",
        textAlign: "center",
        color: "var(--color-text-muted)",
      }}
    >
      <div style={{ fontWeight: 600, marginBottom: 6, color: "var(--color-text)" }}>{title}</div>
      {description ? <div style={{ fontSize: 13 }}>{description}</div> : null}
    </div>
  );
}
