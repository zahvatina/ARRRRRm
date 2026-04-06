type SkeletonProps = {
  width?: string | number;
  height?: string | number;
  radius?: number;
  className?: string;
};

export function Skeleton({
  width = "100%",
  height = 14,
  radius = 6,
  className = "",
}: SkeletonProps) {
  return (
    <span
      className={className}
      aria-hidden
      style={{
        display: "block",
        width,
        height,
        borderRadius: radius,
        background: "linear-gradient(90deg, #eef2f8 0%, #f6f8fc 50%, #eef2f8 100%)",
        backgroundSize: "200% 100%",
        animation: "shimmer 1.2s ease-in-out infinite",
      }}
    />
  );
}
