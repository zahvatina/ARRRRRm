import { Badge } from "../ui/Badge";

type ConversationFiltersProps = {
  activeLabel: string;
  activeCount: number;
};

/** MVP: как на макете — только вкладка «Активные» и счётчик. */
export function ConversationFilters({ activeLabel, activeCount }: ConversationFiltersProps) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: "16px 16px 12px",
      }}
    >
      <span style={{ fontWeight: 600, fontSize: 14 }}>{activeLabel}</span>
      <Badge variant="primary">{activeCount}</Badge>
    </div>
  );
}
