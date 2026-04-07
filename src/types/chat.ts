/** Режим очереди оператора (ровно один активен: чат, заявки, звонки или почта). */
export type OperatorInboxChannel = "chat" | "tickets" | "calls" | "mail";

export type MessageRole = "client" | "agent" | "system";

export type Message = {
  id: string;
  role: Exclude<MessageRole, "system">;
  authorName: string;
  body: string;
  time: string;
  /** Календарный день сообщения (DD.MM.YYYY) для разделителей в ленте */
  calendarDate?: string;
};

export type CustomerProfile = {
  name: string;
  email: string;
  clientId: number;
  vip?: boolean;
  phones: { number: string; label: string }[];
  birthDate: string; // DD.MM.YYYY
  age: number;
  address: string;
  statusLabel: string;
  segmentLabel: string;
  clientSince: string; // DD.MM.YYYY
  loyaltyPoints: number;
  passport?: {
    series: string;
    number: string;
    issuedBy: string;
    issuedDate: string; // DD.MM.YYYY
    code: string;
    registrationAddress: string;
  };
  policies?: {
    id: string;
    type: string;
    number: string;
    status: string;
    from: string; // DD.MM.YYYY
    to: string; // DD.MM.YYYY
  }[];
};

/** Данные входящего письма для отображения вместо ленты чата. */
export type MailThreadDetail = {
  fromEmail: string;
  subject: string;
  /** Дата и время письма, напр. «10.02.2026 14:15» */
  receivedAt: string;
  body: string;
};

/** Строка распознанной речи в режиме «Звонки». */
export type CallTranscriptLine = {
  speaker: "client" | "agent";
  /** Метка времени в ленте транскрипции */
  time: string;
  text: string;
};

/** Параметры активного звонка для шапки рабочей области. */
export type CallSessionInfo = {
  displayNumber: string;
  /** Стартовое значение таймера, сек (для демо). */
  elapsedSeconds?: number;
};

/** Электронная заявка на урегулирование убытков, полученная от клиента (режим «Заявки»). */
export type ClientClaimSettlementForm = {
  applicantName: string;
  contactEmail: string;
  contactPhone: string;
  /** Дата/время подачи заявки */
  submittedAt: string;
  productLabel: string;
  policyNumber: string;
  eventDateTime: string;
  eventPlace: string;
  vehiclePlate?: string;
  description: string;
};

export type Conversation = {
  id: string;
  customerName: string;
  threadTag: string;
  /** К каким каналам относится обращение (для фильтра в профиле оператора). По умолчанию — чат. */
  operatorChannels?: OperatorInboxChannel[];
  /** Если задано и активен почтовый режим — блок «обработка входящего обращения». */
  mailDetail?: MailThreadDetail;
  /** Заявка клиента на урегулирование (режим «Заявки» в центральной панели). */
  ticketClaim?: ClientClaimSettlementForm;
  /** Транскрибация звонка (режим «Звонки»). */
  callTranscript?: CallTranscriptLine[];
  /** Номер и таймер для панели звонка. */
  callSession?: CallSessionInfo;
  avatarUrl?: string;
  lastPreview: string;
  lastTime: string;
  unreadCount?: number;
  messages: Message[];
  profile: CustomerProfile;
};
