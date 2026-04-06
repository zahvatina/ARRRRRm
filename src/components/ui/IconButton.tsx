type IconButtonProps = {
  children: React.ReactNode;
  label: string;
  onClick?: () => void;
  disabled?: boolean;
};

export function IconButton({ children, label, onClick, disabled }: IconButtonProps) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={onClick}
      disabled={disabled}
      style={{
        width: 36,
        height: 36,
        borderRadius: 8,
        border: "1px solid var(--color-border)",
        background: "#fff",
        color: "var(--color-text-muted)",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.5 : 1,
      }}
    >
      {children}
    </button>
  );
}
