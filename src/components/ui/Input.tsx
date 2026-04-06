import { forwardRef } from "react";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  className?: string;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { className = "", style, ...rest },
  ref,
) {
  return (
    <input
      ref={ref}
      className={className}
      style={{
        width: "100%",
        border: "1px solid var(--color-border)",
        borderRadius: "var(--radius-md)",
        padding: "12px 14px",
        outline: "none",
        background: "#fff",
        ...style,
      }}
      {...rest}
    />
  );
});
