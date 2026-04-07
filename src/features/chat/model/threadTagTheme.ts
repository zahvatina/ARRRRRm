/** Цвета тегов тематики треда (шапка чата, список диалогов). */
export const THREAD_TAG_OPTIONS = [
  "ДМС",
  "ОСАГО",
  "КАСКО",
  "Путешествия",
  "Страховой случай",
  "Ипотека",
  "Другое",
] as const;

export type ThreadTag = (typeof THREAD_TAG_OPTIONS)[number];

export function threadTagTheme(tag: string): { bg: string; color: string; border: string } {
  switch (tag) {
    case "ДМС":
      return { bg: "rgba(59, 102, 209, 0.14)", color: "#2f4db8", border: "rgba(59, 102, 209, 0.35)" };
    case "ОСАГО":
      return { bg: "rgba(34, 197, 94, 0.16)", color: "#15803d", border: "rgba(34, 197, 94, 0.45)" };
    case "КАСКО":
      return { bg: "rgba(139, 92, 246, 0.14)", color: "#5b21b6", border: "rgba(139, 92, 246, 0.35)" };
    case "Путешествия":
      return { bg: "rgba(245, 158, 11, 0.18)", color: "#b45309", border: "rgba(245, 158, 11, 0.45)" };
    case "Страховой случай":
      return { bg: "rgba(248, 113, 113, 0.16)", color: "#b91c1c", border: "rgba(248, 113, 113, 0.4)" };
    case "Ипотека":
      return { bg: "rgba(59, 130, 246, 0.14)", color: "#1d4ed8", border: "rgba(59, 130, 246, 0.35)" };
    case "Другое":
    default:
      return { bg: "rgba(107, 114, 128, 0.12)", color: "#374151", border: "rgba(107, 114, 128, 0.3)" };
  }
}
