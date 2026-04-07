import type { Conversation } from "../../types/chat";
import { ConversationFilters } from "./ConversationFilters";
import { ConversationList } from "./ConversationList";
import { QueueStatsFooter } from "./QueueStatsFooter";

type StatPair = { left: string; right: string };

type ConversationsPanelProps = {
  conversations: Conversation[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  collapsed?: boolean;
  onToggleCollapsed?: () => void;
  operator?: {
    name: string;
    role: string;
    photoUrl?: string;
  };
  activeLabel?: string;
  activeCount: number;
  queueStats: StatPair[];
};

export function ConversationsPanel({
  conversations,
  selectedId,
  onSelect,
  collapsed = false,
  onToggleCollapsed,
  operator,
  activeLabel = "Активные",
  activeCount,
  queueStats,
}: ConversationsPanelProps) {
  return (
    <section
      className={`panel panel--left${collapsed ? " panel--leftCollapsed" : ""}`}
      aria-label="Список диалогов"
    >
      <ConversationFilters
        activeLabel={activeLabel}
        activeCount={activeCount}
        collapsed={collapsed}
        onToggleCollapsed={onToggleCollapsed}
        operator={operator}
      />
      <ConversationList
        conversations={conversations}
        selectedId={selectedId}
        onSelect={onSelect}
        compact={collapsed}
      />
      {!collapsed ? <QueueStatsFooter stats={queueStats} /> : null}
    </section>
  );
}
