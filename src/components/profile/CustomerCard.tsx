import type { CustomerProfile } from "../../types/chat";
import { Avatar } from "../ui/Avatar";
import { Badge } from "../ui/Badge";

type CustomerCardProps = {
  profile: CustomerProfile;
};

export function CustomerCard({ profile }: CustomerCardProps) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        padding: "8px 16px 16px",
        borderBottom: "1px solid var(--color-border)",
      }}
    >
      <Avatar name={profile.name} size="lg" />
      <div style={{ marginTop: 12, fontWeight: 700, fontSize: 16 }}>{profile.name}</div>
      <div style={{ marginTop: 8 }}>
        <Badge variant="primary">{profile.segmentLabel}</Badge>
      </div>
    </div>
  );
}
