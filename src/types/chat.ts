/** Каналы приёма обращений в очереди оператора */
export type OperatorInboxChannel = "chat" | "tickets" | "calls" | "mail";

export type OperatorInboxChannels = Record<OperatorInboxChannel, boolean>;

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
  statusLabel: string;
  /** Дата и время письма, напр. «10.02.2026 14:15» */
  receivedAt: string;
  body: string;
};

export type Conversation = {
  id: string;
  customerName: string;
  threadTag: string;
  /** К каким каналам относится обращение (для фильтра в профиле оператора). По умолчанию — чат. */
  operatorChannels?: OperatorInboxChannel[];
  /** Если задано и активен почтовый режим — блок «обработка входящего обращения». */
  mailDetail?: MailThreadDetail;
  avatarUrl?: string;
  lastPreview: string;
  lastTime: string;
  unreadCount?: number;
  messages: Message[];
  profile: CustomerProfile;
};
