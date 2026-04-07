import type { CustomerProfile } from "../../types/chat";

type CustomerAttributesProps = {
  profile: CustomerProfile;
};

function Row({ label, value, withDivider }: { label: string; value: string; withDivider?: boolean }) {
  return (
    <div
      style={{
        padding: "10px 0",
        borderTop: withDivider ? "1px solid var(--color-border)" : undefined,
      }}
    >
      <div style={{ fontSize: 12, color: "var(--color-text-muted)", marginBottom: 4 }}>{label}</div>
      <div style={{ fontSize: 14, fontWeight: 500 }}>{value}</div>
    </div>
  );
}

export function CustomerAttributes({ profile }: CustomerAttributesProps) {
  const services = (profile as unknown as { services?: string[] }).services?.join(", ") ?? "";
  const city = (profile as unknown as { city?: string }).city ?? "";
  return (
    <div style={{ padding: "0 16px 16px" }}>
      {city ? <Row label="Город" value={city} withDivider /> : null}
      {services ? <Row label="Услуги" value={services} withDivider /> : null}
      <Row label="ID клиента" value={String(profile.clientId)} withDivider />
    </div>
  );
}
