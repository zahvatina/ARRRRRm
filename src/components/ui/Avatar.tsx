type AvatarProps = {
  name: string;
  src?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
};

function initials(name: string) {
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
}

export function Avatar({ name, src, size = "md", className = "" }: AvatarProps) {
  const dim = size === "sm" ? 36 : size === "lg" ? 72 : 44;
  const fontSize = size === "sm" ? 12 : size === "lg" ? 24 : 14;

  if (src) {
    return (
      <img
        src={src}
        alt=""
        width={dim}
        height={dim}
        className={className}
        style={{
          width: dim,
          height: dim,
          borderRadius: "50%",
          objectFit: "cover",
          display: "block",
        }}
      />
    );
  }

  return (
    <span
      className={className}
        aria-hidden
      style={{
        width: dim,
        height: dim,
        borderRadius: "50%",
        background: "linear-gradient(145deg, #c7d6f5, #3b66d1)",
        color: "#fff",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: 600,
        fontSize,
        flexShrink: 0,
      }}
    >
      {initials(name)}
    </span>
  );
}
