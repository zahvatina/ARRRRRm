import { useMemo, useState } from "react";
import { ChatWorkspace } from "./components/chat/ChatWorkspace";
import { ConversationsPanel } from "./components/conversations/ConversationsPanel";
import { CustomerProfilePanel } from "./components/profile/CustomerProfilePanel";
import { WorkspaceTopBar } from "./components/workspace/WorkspaceTopBar";
import {
  activeConversationsCount,
  mockConversations,
  queueStatsMock,
} from "./features/chat/model/mockData";
import type { Conversation } from "./types/chat";

export default function App() {
  const [conversations, setConversations] = useState<Conversation[]>(mockConversations);
  const [selectedId, setSelectedId] = useState<string | null>("c4");

  const selected = useMemo(
    () => conversations.find((c) => c.id === selectedId) ?? null,
    [conversations, selectedId],
  );

  const handleSend = (text: string) => {
    if (!selectedId) return;
    const time = new Date().toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" });
    setConversations((prev) =>
      prev.map((c) => {
        if (c.id !== selectedId) return c;
        const newMsg = {
          id: `m-${Date.now()}`,
          role: "agent" as const,
          authorName: "Марина Голованова",
          time,
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

  return (
    <div className="app-shell">
      <ConversationsPanel
        conversations={conversations}
        selectedId={selectedId}
        onSelect={setSelectedId}
        activeCount={activeConversationsCount}
        queueStats={queueStatsMock}
      />
      <div className="workspace">
        <WorkspaceTopBar
          operator={{
            name: "Марина Голованова",
            role: "Оператор поддержки",
          }}
        />
        <div className="workspace-main">
          <ChatWorkspace conversation={selected} onSendMessage={handleSend} />
          <CustomerProfilePanel profile={selected?.profile ?? null} />
        </div>
      </div>
    </div>
  );
}
