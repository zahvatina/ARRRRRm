type TypingIndicatorProps = {
  visible?: boolean;
  authorName?: string;
};

/** Зарезервировано под realtime; на макете нет — по умолчанию скрыт. */
export function TypingIndicator({ visible = false, authorName }: TypingIndicatorProps) {
  if (!visible) return null;
  return (
    <div style={{ fontSize: 13, color: "var(--color-text-muted)", padding: "8px 0" }}>
      {authorName ?? "Клиент"} печатает…
    </div>
  );
}
