import React from "react";

type TooltipProps = {
  label: string;
  children: React.ReactNode;
};

/** Обёртка для нативного title; позже можно заменить на портал/позиционирование. */
export function Tooltip({ label, children }: TooltipProps) {
  if (!React.isValidElement(children)) {
    return <span title={label}>{children}</span>;
  }
  return React.cloneElement(children as React.ReactElement<{ title?: string }>, {
    title: label,
  });
}
