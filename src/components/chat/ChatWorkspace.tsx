import { useMemo, useState } from "react";
import {
  resolveMailDetail,
  shouldShowMailWorkspace,
} from "../../features/chat/model/mailWorkspace";
import type { Conversation, OperatorInboxChannels } from "../../types/chat";
import { EmptyState } from "../ui/EmptyState";
import { ChatHeader } from "./ChatHeader";
import { Composer } from "./Composer";
import { MailRequestView } from "./MailRequestView";
import { MessageThread } from "./MessageThread";

type ChatWorkspaceProps = {
  conversation: Conversation | null;
  operatorInbox: OperatorInboxChannels;
  onSendMessage?: (text: string) => void;
  onChangeThreadTag?: (tag: string) => void;
};

export function ChatWorkspace({
  conversation,
  operatorInbox,
  onSendMessage,
  onChangeThreadTag,
}: ChatWorkspaceProps) {
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

  const lastClientMessage = useMemo(() => {
    for (let i = conversation.messages.length - 1; i >= 0; i--) {
      const m = conversation.messages[i];
      if (m.role === "client") return m.body;
    }
    return "";
  }, [conversation.messages]);

  const mailMode = shouldShowMailWorkspace(conversation, operatorInbox);
  const mailDetail = useMemo(
    () => (mailMode ? resolveMailDetail(conversation) : null),
    [conversation, mailMode],
  );

  return (
    <section className="panel panel--center" aria-label={mailMode ? "Входящее обращение по почте" : "Окно чата"}>
      {mailMode ? null : (
        <ChatHeader threadTag={conversation.threadTag} onChangeThreadTag={onChangeThreadTag} />
      )}
      <div className={mailMode ? "chat-workspace__body chat-workspace__body--mail" : "chat-workspace__body"}>
        {mailMode && mailDetail ? (
          <div className="chat-workspace__mail-scroll">
            <MailRequestView detail={mailDetail} />
          </div>
        ) : (
          <MessageThread messages={conversation.messages} threadTag={conversation.threadTag} />
        )}
        <Composer
          value={draft}
          onChange={setDraft}
          onSend={send}
          threadTag={conversation.threadTag}
          lastClientMessage={lastClientMessage}
        />
      </div>
    </section>
  );
}
