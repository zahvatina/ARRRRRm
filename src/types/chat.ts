export type MessageRole = "client" | "agent" | "system";

export type Message = {
  id: string;
  role: Exclude<MessageRole, "system">;
  authorName: string;
  body: string;
  time: string;
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

export type Conversation = {
  id: string;
  customerName: string;
  avatarUrl?: string;
  lastPreview: string;
  lastTime: string;
  unreadCount?: number;
  messages: Message[];
  profile: CustomerProfile;
};
