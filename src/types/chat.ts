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
  segmentLabel: string;
  email: string;
  city: string;
  services: string[];
  clientId: number;
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
