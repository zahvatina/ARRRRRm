import type { CustomerProfile } from "../../types/chat";

type CustomerContactsProps = {
  profile: CustomerProfile;
};

export function CustomerContacts({ profile }: CustomerContactsProps) {
  return (
    <div style={{ padding: "12px 16px" }}>
      <div style={{ fontSize: 12, color: "var(--color-text-muted)", marginBottom: 4 }}>Телефон и email</div>
      <div style={{ fontSize: 14, fontWeight: 500, color: "var(--color-primary)" }}>{profile.email}</div>
    </div>
  );
}
