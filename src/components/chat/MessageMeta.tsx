type MessageMetaProps = {
  authorName: string;
  time: string;
};

export function MessageMeta({ authorName, time }: MessageMetaProps) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "baseline",
        gap: 8,
        marginBottom: 6,
        fontSize: 13,
      }}
    >
      <span style={{ fontWeight: 600 }}>{authorName}</span>
      <span style={{ fontSize: 12, color: "var(--color-text-muted)" }}>{time}</span>
    </div>
  );
}
