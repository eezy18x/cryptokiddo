import { ReactElement, ReactNode, useCallback, useMemo, useRef, useState } from "react";

type MagicBentoProps = {
  children: ReactNode;
  textAutoHide?: boolean;
  enableStars?: boolean;
  enableSpotlight?: boolean;
  enableBorderGlow?: boolean;
  enableTilt?: boolean;
  enableMagnetism?: boolean;
  clickEffect?: boolean;
  spotlightRadius?: number;
  particleCount?: number;
  glowColor?: string;
  disableAnimations?: boolean;
};

const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value));

const MagicBento = ({
  children,
  textAutoHide = false,
  enableStars = false,
  enableSpotlight = false,
  enableBorderGlow = false,
  enableTilt = false,
  enableMagnetism = false,
  clickEffect = false,
  spotlightRadius = 240,
  particleCount = 8,
  glowColor = "132, 0, 255",
  disableAnimations = false,
}: MagicBentoProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [spotlight, setSpotlight] = useState({ x: 0, y: 0, visible: false });

  const classForCard = [
    "magic-bento-card",
    textAutoHide ? "magic-bento-card--text-autohide" : "",
    enableBorderGlow ? "magic-bento-card--border-glow" : "",
    enableStars ? "particle-container" : "",
  ]
    .filter(Boolean)
    .join(" ");

  const createRipple = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    if (!clickEffect) return;
    const target = event.currentTarget;
    const rect = target.getBoundingClientRect();
    const ripple = document.createElement("span");
    ripple.className = "magic-bento-ripple";
    ripple.style.left = `${event.clientX - rect.left}px`;
    ripple.style.top = `${event.clientY - rect.top}px`;
    target.appendChild(ripple);
    window.setTimeout(() => ripple.remove(), 650);
  }, [clickEffect]);

  const handleMove = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      const target = event.currentTarget;
      const rect = target.getBoundingClientRect();
      const x = clamp(((event.clientX - rect.left) / rect.width) * 100, 0, 100);
      const y = clamp(((event.clientY - rect.top) / rect.height) * 100, 0, 100);

      target.style.setProperty("--glow-x", `${x}%`);
      target.style.setProperty("--glow-y", `${y}%`);
      target.style.setProperty("--glow-intensity", "1");
      target.style.setProperty("--glow-radius", `${spotlightRadius}px`);

      if (enableTilt && !disableAnimations) {
        const tiltX = ((y - 50) / 50) * -4;
        const tiltY = ((x - 50) / 50) * 4;
        target.style.transform = `translateY(-2px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
      }

      if (enableSpotlight && containerRef.current && !disableAnimations) {
        const cRect = containerRef.current.getBoundingClientRect();
        setSpotlight({
          x: event.clientX - cRect.left,
          y: event.clientY - cRect.top,
          visible: true,
        });
      }

      if (enableMagnetism && containerRef.current && !disableAnimations) {
        const cRect = containerRef.current.getBoundingClientRect();
        setSpotlight({
          x: event.clientX - cRect.left,
          y: event.clientY - cRect.top,
          visible: true,
        });
      }
    },
    [enableTilt, enableMagnetism, enableSpotlight, disableAnimations, spotlightRadius]
  );

  const handleLeave = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    const target = event.currentTarget;
    target.style.setProperty("--glow-intensity", "0");
    target.style.transform = "";
    if (enableSpotlight) {
      setSpotlight((prev) => ({ ...prev, visible: false }));
    }
  }, [enableSpotlight]);

  const particles = useMemo(() => {
    if (!enableStars || disableAnimations) return [];
    return Array.from({ length: particleCount }).map((_, index) => ({
      id: index,
      size: 4 + (index % 4),
      top: `${(index * 13) % 90}%`,
      left: `${(index * 17) % 90}%`,
      delay: `${(index % 5) * 0.6}s`,
    }));
  }, [enableStars, disableAnimations, particleCount]);

  const spotlightStyle = enableSpotlight
    ? {
        background: `radial-gradient(${spotlightRadius}px circle at ${spotlight.x}px ${spotlight.y}px, rgba(${glowColor}, 0.18), transparent 70%)`,
        opacity: spotlight.visible ? 1 : 0,
      }
    : undefined;

  return (
    <div className="bento-section" ref={containerRef}>
      {enableSpotlight && (
        <div
          className="global-spotlight absolute inset-0 transition-opacity duration-300"
          style={spotlightStyle}
        />
      )}
      <div className="card-grid relative z-10">
        {Array.isArray(children)
          ? children.map((child, index) => {
              if (!child || typeof child !== "object") return child;
              const element = child as ReactElement<{ className?: string }>;
              const className = [classForCard, element.props.className].filter(Boolean).join(" ");
              return (
                <div
                  key={index}
                  className={className}
                  onMouseMove={handleMove}
                  onMouseLeave={handleLeave}
                  onClick={createRipple}
                >
                  {enableStars &&
                    particles.map((particle) => (
                      <span
                        key={particle.id}
                        className="particle"
                        style={{
                          width: particle.size,
                          height: particle.size,
                          top: particle.top,
                          left: particle.left,
                          animationDelay: particle.delay,
                        }}
                      />
                    ))}
                  {element.props.children}
                </div>
              );
            })
          : children}
      </div>
    </div>
  );
};

export default MagicBento;
