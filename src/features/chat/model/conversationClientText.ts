import type { Conversation } from "../../../types/chat";

/** Текст для подсказок/шаблонов: последнее сообщение клиента в чате или смысл обращения из почты / заявки / транскрипта. */
export function getLastClientContextText(c: Conversation): string {
  for (let i = c.messages.length - 1; i >= 0; i--) {
    const m = c.messages[i];
    if (m.role === "client") return m.body;
  }
  const mail = c.mailDetail?.body?.trim();
  if (mail) return mail;
  const ticket = c.ticketClaim?.description?.trim();
  if (ticket) return ticket;
  const lines = c.callTranscript ?? [];
  for (let i = lines.length - 1; i >= 0; i--) {
    if (lines[i].speaker === "client") return lines[i].text;
  }
  return "";
}
