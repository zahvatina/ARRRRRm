type ConversationMetaProps = {
  time: string;
  channelTag?: string;
};

export function ConversationMeta({ time, channelTag }: ConversationMetaProps) {
  return (
    <span
      style={{
        fontSize: 12,
        color: "var(--color-text-muted)",
        whiteSpace: "nowrap",
      }}
    >
      {time}
      {channelTag ? ` · ${channelTag}` : ""}
    </span>
  );
}
