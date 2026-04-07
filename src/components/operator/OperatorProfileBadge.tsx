import { Avatar } from "../ui/Avatar";

type OperatorProfileBadgeProps = {
  name: string;
  role: string;
  status: string;
  photoUrl?: string;
};

export function OperatorProfileBadge({ name, role, status, photoUrl }: OperatorProfileBadgeProps) {
  return (
    <div className="operator-profile" aria-label="Профиль оператора">
      <Avatar name={name} src={photoUrl} size="sm" />
      <div className="operator-profile__meta">
        <div className="operator-profile__name">{name}</div>
        <div className="operator-profile__role">{role}</div>
      </div>
      <div className="operator-profile__status">{status}</div>
    </div>
  );
}

