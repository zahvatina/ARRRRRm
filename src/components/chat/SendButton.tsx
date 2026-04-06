type SendButtonProps = {
  disabled?: boolean;
  loading?: boolean;
};

function PaperPlaneIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M22 2L11 13"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M22 2L15 22L11 13L2 9L22 2Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function SendButton({ disabled, loading }: SendButtonProps) {
  const isDisabled = disabled || loading;
  return (
    <button
      type="submit"
      aria-label="Отправить сообщение"
      disabled={isDisabled}
      style={{
        width: 44,
        height: 44,
        borderRadius: 10,
        border: "none",
        background: isDisabled ? "#9caee8" : "var(--color-primary)",
        color: "#fff",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: isDisabled ? "not-allowed" : "pointer",
        flexShrink: 0,
      }}
    >
      {loading ? "…" : <PaperPlaneIcon />}
    </button>
  );
}
