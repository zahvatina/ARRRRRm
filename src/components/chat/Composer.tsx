import { forwardRef } from "react";
import { SendButton } from "./SendButton";

type ComposerProps = {
  value: string;
  onChange: (v: string) => void;
  onSend: () => void;
  placeholder?: string;
  disabled?: boolean;
};

export const Composer = forwardRef<HTMLInputElement, ComposerProps>(function Composer(
  { value, onChange, onSend, placeholder = "Введите сообщение...", disabled },
  ref,
) {
  return (
    <form
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: "12px 16px",
        borderTop: "1px solid var(--color-border)",
        background: "#fafbfd",
      }}
      onSubmit={(e) => {
        e.preventDefault();
        if (!disabled && value.trim()) onSend();
      }}
    >
      <input
        ref={ref}
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label="Текст сообщения"
        style={{
          flex: 1,
          border: "1px solid var(--color-border)",
          borderRadius: "var(--radius-md)",
          padding: "12px 14px",
          outline: "none",
          background: "#fff",
        }}
      />
      <SendButton disabled={disabled || !value.trim()} />
    </form>
  );
});
