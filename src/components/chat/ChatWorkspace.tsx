import { useState } from "react";
import type { Conversation } from "../../types/chat";
import { EmptyState } from "../ui/EmptyState";
import { ChatHeader } from "./ChatHeader";
import { Composer } from "./Composer";
import { MessageThread } from "./MessageThread";

type ChatWorkspaceProps = {
  conversation: Conversation | null;
  onSendMessage?: (text: string) => void;
};

export function ChatWorkspace({ conversation, onSendMessage }: ChatWorkspaceProps) {
  const [draft, setDraft] = useState("");

  if (!conversation) {
    return (
      <section className="panel panel--center" aria-label="Чат">
        <EmptyState title="Выберите диалог" description="Слева список активных обращений." />
      </section>
    );
  }

  const send = () => {
    const t = draft.trim();
    if (!t || !onSendMessage) return;
    onSendMessage(t);
    setDraft("");
  };

  return (
    <section className="panel panel--center" aria-label="Окно чата">
      <ChatHeader customerName={conversation.customerName} />
      <div style={{ display: "flex", flexDirection: "column", flex: 1, minHeight: 0 }}>
        <MessageThread messages={conversation.messages} />
        <Composer value={draft} onChange={setDraft} onSend={send} />
      </div>
    </section>
  );
}
