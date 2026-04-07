import { useEffect, useMemo, useState } from "react";
import {
  resolveMailDetail,
  shouldShowMailWorkspace,
} from "../../features/chat/model/mailWorkspace";
import { resolveCallSession, resolveCallTranscript, shouldShowCallsWorkspace } from "../../features/chat/model/callWorkspace";
import {
  resolveTicketClaimForm,
  shouldShowTicketsWorkspace,
} from "../../features/chat/model/ticketWorkspace";
import { getOperatorHintVariants } from "../../features/chat/model/operatorHints";
import { getLastClientContextText } from "../../features/chat/model/conversationClientText";
import type { Conversation, OperatorInboxChannel } from "../../types/chat";
import { EmptyState } from "../ui/EmptyState";
import { ChatHeader } from "./ChatHeader";
import { Composer } from "./Composer";
import { CallsWorkspaceView } from "./CallsWorkspaceView";
import { MailRequestView } from "./MailRequestView";
import { MessageThread } from "./MessageThread";
import { TicketsClaimFormView } from "./TicketsClaimFormView";

type ChatWorkspaceProps = {
  conversation: Conversation | null;
  operatorInboxMode: OperatorInboxChannel;
  onSendMessage?: (text: string) => void;
  onChangeThreadTag?: (tag: string) => void;
};

export function ChatWorkspace({
  conversation,
  operatorInboxMode,
  onSendMessage,
  onChangeThreadTag,
}: ChatWorkspaceProps) {
  const [draft, setDraft] = useState("");

  const lastClientMessage = useMemo(
    () => (conversation ? getLastClientContextText(conversation) : ""),
    [conversation],
  );

  useEffect(() => {
    if (!conversation) {
      setDraft("");
      return;
    }
    const hint = getOperatorHintVariants(conversation.threadTag, getLastClientContextText(conversation))[0] ?? "";
    setDraft(hint);
  }, [conversation?.id]);

  if (!conversation) {
    return (
      <section
        className="panel panel--center"
        aria-label={
          operatorInboxMode === "mail"
            ? "Почта"
            : operatorInboxMode === "tickets"
              ? "Заявки"
              : operatorInboxMode === "calls"
                ? "Звонки"
                : "Чат"
        }
      >
        <EmptyState
          title={
            operatorInboxMode === "mail"
              ? "Нет обращений по почте"
              : operatorInboxMode === "tickets"
                ? "Нет заявок в очереди"
                : operatorInboxMode === "calls"
                  ? "Нет звонков в очереди"
                  : "Выберите диалог"
          }
          description={
            operatorInboxMode === "mail"
              ? "В очереди нет писем или выберите обращение в списке слева."
              : operatorInboxMode === "tickets"
                ? "Выберите текущую заявку в списке слева."
                : operatorInboxMode === "calls"
                  ? "Выберите активный звонок в списке слева."
                  : "Слева список активных обращений."
          }
        />
      </section>
    );
  }

  const send = () => {
    const t = draft.trim();
    if (!t || !onSendMessage) return;
    onSendMessage(t);
    setDraft("");
  };

  const mailMode = shouldShowMailWorkspace(conversation, operatorInboxMode);
  const ticketsMode = shouldShowTicketsWorkspace(operatorInboxMode);
  const callsMode = shouldShowCallsWorkspace(operatorInboxMode);
  const mailDetail = useMemo(
    () => (mailMode ? resolveMailDetail(conversation) : null),
    [conversation, mailMode],
  );
  const ticketForm = useMemo(
    () => (ticketsMode ? resolveTicketClaimForm(conversation) : null),
    [conversation, ticketsMode],
  );
  const callSession = useMemo(() => (callsMode ? resolveCallSession(conversation) : null), [conversation, callsMode]);
  const callTranscript = useMemo(
    () => (callsMode ? resolveCallTranscript(conversation) : []),
    [conversation, callsMode],
  );

  const shellAria = mailMode
    ? "Входящее обращение по почте"
    : ticketsMode
      ? "Заявка на урегулирование убытков"
      : callsMode
        ? "Звонок и транскрибация"
        : "Окно чата";

  const bodyClass =
    mailMode ? "chat-workspace__body chat-workspace__body--mail"
    : ticketsMode ? "chat-workspace__body chat-workspace__body--tickets"
    : callsMode ? "chat-workspace__body chat-workspace__body--calls"
    : "chat-workspace__body";

  return (
    <section className="panel panel--center" aria-label={shellAria}>
      {mailMode || ticketsMode || callsMode ? null : (
        <ChatHeader threadTag={conversation.threadTag} onChangeThreadTag={onChangeThreadTag} />
      )}
      <div className={bodyClass}>
        {mailMode && mailDetail ? (
          <div className="chat-workspace__mail-scroll">
            <MailRequestView
              detail={mailDetail}
              threadTag={conversation.threadTag}
              onChangeThreadTag={onChangeThreadTag}
            />
          </div>
        ) : ticketsMode && ticketForm ? (
          <div className="chat-workspace__ticket-scroll">
            <TicketsClaimFormView
              form={ticketForm}
              threadTag={conversation.threadTag}
              onChangeThreadTag={onChangeThreadTag}
            />
          </div>
        ) : callsMode && callSession ? (
          <div className="chat-workspace__calls-scroll">
            <CallsWorkspaceView
              session={callSession}
              transcript={callTranscript}
              threadTag={conversation.threadTag}
              onChangeThreadTag={onChangeThreadTag}
              agentLabel="Марина Голованова"
            />
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
