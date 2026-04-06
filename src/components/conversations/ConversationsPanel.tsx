import type { Conversation } from "../../types/chat";
import { ConversationFilters } from "./ConversationFilters";
import { ConversationList } from "./ConversationList";
import { QueueStatsFooter } from "./QueueStatsFooter";

type StatPair = { left: string; right: string };

type ConversationsPanelProps = {
  conversations: Conversation[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  activeLabel?: string;
  activeCount: number;
  queueStats: StatPair[];
};

export function ConversationsPanel({
  conversations,
  selectedId,
  onSelect,
  activeLabel = "Активные",
  activeCount,
  queueStats,
}: ConversationsPanelProps) {
  return (
    <section className="panel panel--left" aria-label="Список диалогов">
      <ConversationFilters activeLabel={activeLabel} activeCount={activeCount} />
      <ConversationList conversations={conversations} selectedId={selectedId} onSelect={onSelect} />
      <QueueStatsFooter stats={queueStats} />
    </section>
  );
}
