import { CSSProperties, ReactNode } from "react";

interface ShinyTextProps {
  children: ReactNode;
  className?: string;
  shimmerWidth?: number;
  speed?: number;
}

const ShinyText = ({
  children,
  className = "",
  shimmerWidth = 100,
  speed = 2,
}: ShinyTextProps) => {
  const shimmerStyle: CSSProperties = {
    backgroundImage: `linear-gradient(
      90deg,
      transparent 0%,
      rgba(255, 255, 255, 0) 10%,
      rgba(255, 255, 255, 0.5) 50%,
      rgba(255, 255, 255, 0) 90%,
      transparent 100%
    )`,
    backgroundSize: `${shimmerWidth}% 100%`,
    backgroundRepeat: "no-repeat",
    backgroundClip: "text",
    WebkitBackgroundClip: "text",
    color: "transparent",
    animation: `shimmer ${speed}s infinite linear`,
  };

  return (
    <>
      <style>{`
        @keyframes shimmer {
          0% {
            background-position: -${shimmerWidth}% 0;
          }
          100% {
            background-position: ${shimmerWidth + 100}% 0;
          }
        }
      `}</style>
      <span
        className={className}
        style={{ position: "relative", display: "inline-block" }}
      >
        <span style={{ position: "relative", zIndex: 10 }}>{children}</span>
        <span
          style={{
            ...shimmerStyle,
            position: "absolute",
            inset: 0,
            zIndex: 20,
            pointerEvents: "none",
          }}
        >
          {children}
        </span>
      </span>
    </>
  );
};

export default ShinyText;
