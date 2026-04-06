type BadgeProps = {
  children: React.ReactNode;
  variant?: "primary" | "neutral";
  className?: string;
  title?: string;
};

export function Badge({ children, variant = "primary", className = "", title }: BadgeProps) {
  const bg = variant === "primary" ? "var(--color-primary)" : "#e5e7eb";
  const color = variant === "primary" ? "#fff" : "var(--color-text)";

  return (
    <span
      title={title}
      className={className}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        minWidth: 22,
        height: 22,
        padding: "0 7px",
        borderRadius: 999,
        background: bg,
        color,
        fontSize: 12,
        fontWeight: 600,
        lineHeight: 1,
      }}
    >
      {children}
    </span>
  );
}
