import { useEffect, useMemo, useState } from "react";
import { ChatWorkspace } from "./components/chat/ChatWorkspace";
import { ConversationsPanel } from "./components/conversations/ConversationsPanel";
import { CustomerProfilePanel } from "./components/profile/CustomerProfilePanel";
import {
  DEFAULT_OPERATOR_INBOX,
  filterConversationsByInbox,
} from "./features/chat/model/operatorInbox";
import { mockConversations, queueStatsMock } from "./features/chat/model/mockData";
import { todayCalendarDateRu } from "./features/chat/model/formatCalendarDate";
import type { Conversation, OperatorInboxChannels } from "./types/chat";

export default function App() {
  const [conversations, setConversations] = useState<Conversation[]>(mockConversations);
  const [selectedId, setSelectedId] = useState<string | null>("c4");
  const [leftCollapsed, setLeftCollapsed] = useState(false);
  const [operatorInbox, setOperatorInbox] = useState<OperatorInboxChannels>(DEFAULT_OPERATOR_INBOX);

  const visibleConversations = useMemo(
    () => filterConversationsByInbox(conversations, operatorInbox),
    [conversations, operatorInbox],
  );

  const selected = useMemo(
    () => conversations.find((c) => c.id === selectedId) ?? null,
    [conversations, selectedId],
  );

  useEffect(() => {
    if (selectedId && !visibleConversations.some((c) => c.id === selectedId)) {
      setSelectedId(visibleConversations[0]?.id ?? null);
    }
  }, [selectedId, visibleConversations]);

  const handleSend = (text: string) => {
    if (!selectedId) return;
    const time = new Date().toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" });
    setConversations((prev) =>
      prev.map((c) => {
        if (c.id !== selectedId) return c;
        const lastCal = c.messages[c.messages.length - 1]?.calendarDate ?? todayCalendarDateRu();
        const newMsg = {
          id: `m-${Date.now()}`,
          role: "agent" as const,
          authorName: "Марина Голованова",
          time,
          calendarDate: lastCal,
          body: text,
        };
        const preview = text.length > 48 ? `${text.slice(0, 48)}…` : text;
        return {
          ...c,
          messages: [...c.messages, newMsg],
          lastPreview: preview,
          lastTime: time,
        };
      }),
    );
  };

  const handleChangeThreadTag = (tag: string) => {
    if (!selectedId) return;
    setConversations((prev) => prev.map((c) => (c.id === selectedId ? { ...c, threadTag: tag } : c)));
  };

  return (
    <div className={`app-shell${leftCollapsed ? " app-shell--leftCollapsed" : ""}`}>
      <ConversationsPanel
        conversations={visibleConversations}
        selectedId={selectedId}
        onSelect={setSelectedId}
        collapsed={leftCollapsed}
        onToggleCollapsed={() => setLeftCollapsed((v) => !v)}
        operator={{
          name: "Марина Голованова",
          role: "Оператор поддержки",
          inboxChannels: operatorInbox,
          onInboxChannelsChange: setOperatorInbox,
        }}
        activeCount={visibleConversations.length}
        queueStats={queueStatsMock}
      />
      <div className="workspace">
        <div className="workspace-main">
          <ChatWorkspace
            conversation={selected}
            operatorInbox={operatorInbox}
            onSendMessage={handleSend}
            onChangeThreadTag={handleChangeThreadTag}
          />
          <CustomerProfilePanel profile={selected?.profile ?? null} />
        </div>
      </div>
    </div>
  );
}
