import type { ClientClaimSettlementForm, Conversation, OperatorInboxChannel } from "../../../types/chat";

export function shouldShowTicketsWorkspace(mode: OperatorInboxChannel): boolean {
  return mode === "tickets";
}

export function resolveTicketClaimForm(conversation: Conversation): ClientClaimSettlementForm {
  if (conversation.ticketClaim) return conversation.ticketClaim;
  const first = conversation.messages.find((m) => m.role === "client");
  const phone = conversation.profile.phones[0]?.number ?? "—";
  const policyNumber = conversation.profile.policies?.[0]?.number;
  const submittedAt =
    first?.calendarDate && first?.time ? `${first.calendarDate} ${first.time}` : conversation.lastTime;
  return {
    applicantName: conversation.customerName,
    contactEmail: conversation.profile.email,
    contactPhone: phone,
    submittedAt,
    productLabel: conversation.threadTag,
    policyNumber: policyNumber ?? conversation.profile.policies?.[0]?.number ?? "—",
    eventDateTime: "—",
    eventPlace: "—",
    description: first?.body ?? "—",
  };
}
