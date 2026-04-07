const RU_MONTHS = [
  "января",
  "февраля",
  "марта",
  "апреля",
  "мая",
  "июня",
  "июля",
  "августа",
  "сентября",
  "октября",
  "ноября",
  "декабря",
] as const;

/** DD.MM.YYYY → «23 марта» (без года) */
export function formatRuDayMonth(ddmmyyyy: string): string {
  const p = ddmmyyyy.split(".");
  if (p.length !== 3) return ddmmyyyy;
  const d = parseInt(p[0], 10);
  const m = parseInt(p[1], 10);
  if (!Number.isFinite(d) || !Number.isFinite(m) || m < 1 || m > 12) return ddmmyyyy;
  return `${d} ${RU_MONTHS[m - 1]}`;
}

export function todayCalendarDateRu(): string {
  const x = new Date();
  const dd = String(x.getDate()).padStart(2, "0");
  const mm = String(x.getMonth() + 1).padStart(2, "0");
  const yyyy = String(x.getFullYear());
  return `${dd}.${mm}.${yyyy}`;
}
