import { useLayoutEffect, useMemo, useRef, useState } from "react";
import { ChatWorkspace } from "./components/chat/ChatWorkspace";
import { ConversationsPanel } from "./components/conversations/ConversationsPanel";
import { CustomerProfilePanel } from "./components/profile/CustomerProfilePanel";
import {
  DEFAULT_OPERATOR_INBOX_MODE,
  filterConversationsByInbox,
} from "./features/chat/model/operatorInbox";
import { mockConversations, queueStatsMock } from "./features/chat/model/mockData";
import { todayCalendarDateRu } from "./features/chat/model/formatCalendarDate";
import type { Conversation, OperatorInboxChannel } from "./types/chat";

export default function App() {
  const [conversations, setConversations] = useState<Conversation[]>(mockConversations);
  const [selectedId, setSelectedId] = useState<string | null>("c4");
  const [leftCollapsed, setLeftCollapsed] = useState(false);
  const [operatorInboxMode, setOperatorInboxMode] = useState<OperatorInboxChannel>(DEFAULT_OPERATOR_INBOX_MODE);
  const prevInboxModeRef = useRef<OperatorInboxChannel>(operatorInboxMode);

  /** Все обращения выбранного канала (до сжатия до одной карточки). */
  const channelQueue = useMemo(
    () => filterConversationsByInbox(conversations, operatorInboxMode),
    [conversations, operatorInboxMode],
  );

  /** В «Почта» и «Заявки» в очереди только текущее обращение; в «Чат» и «Звонки» — полный список канала. */
  const visibleConversations = useMemo(() => {
    if (operatorInboxMode !== "mail" && operatorInboxMode !== "tickets") {
      return channelQueue;
    }
    if (selectedId) {
      const current = channelQueue.find((c) => c.id === selectedId);
      if (current) return [current];
    }
    return channelQueue[0] ? [channelQueue[0]] : [];
  }, [channelQueue, operatorInboxMode, selectedId]);

  const selected = useMemo(
    () => conversations.find((c) => c.id === selectedId) ?? null,
    [conversations, selectedId],
  );

  /** До отрисовки: выбранный id должен быть в очереди канала; при переходе на «Почта» — демо c6. */
  useLayoutEffect(() => {
    const ids = channelQueue.map((c) => c.id);
    if (ids.length === 0) {
      if (selectedId !== null) setSelectedId(null);
      prevInboxModeRef.current = operatorInboxMode;
      return;
    }

    const modeChanged = prevInboxModeRef.current !== operatorInboxMode;
    prevInboxModeRef.current = operatorInboxMode;

    if (modeChanged && operatorInboxMode === "mail" && ids.includes("c6")) {
      setSelectedId("c6");
      return;
    }

    if (modeChanged && operatorInboxMode === "calls" && ids.includes("c5")) {
      setSelectedId("c5");
      return;
    }

    if (selectedId && ids.includes(selectedId)) return;
    setSelectedId(ids[0] ?? null);
  }, [operatorInboxMode, channelQueue, selectedId]);

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
          inboxMode: operatorInboxMode,
          onInboxModeChange: setOperatorInboxMode,
        }}
        activeCount={visibleConversations.length}
        queueStats={queueStatsMock}
      />
      <div className="workspace">
        <div className="workspace-main">
          <ChatWorkspace
            conversation={selected}
            operatorInboxMode={operatorInboxMode}
            onSendMessage={handleSend}
            onChangeThreadTag={handleChangeThreadTag}
          />
          <CustomerProfilePanel profile={selected?.profile ?? null} />
        </div>
      </div>
    </div>
  );
}
