import { Avatar } from "../ui/Avatar";

type ConversationAvatarProps = {
  name: string;
  src?: string;
};

export function ConversationAvatar({ name, src }: ConversationAvatarProps) {
  return <Avatar name={name} src={src} size="sm" />;
}
