"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

const WORDS = [
  "sublimées",
  "romantisées",
  "organisées",
  "imaginées",
  "enchantées",
  "réinventées",
  "inspirées",
  "magnifiées",
  "embellies",
];

const HEARTS = [
  { x: 8, y: 55, dx: -18, dy: -70, rot: -18, delay: 0, size: 16, opacity: 0.6 },
  { x: 24, y: 42, dx: 16, dy: -85, rot: 14, delay: 90, size: 22, opacity: 0.5 },
  { x: 44, y: 60, dx: -10, dy: -72, rot: -8, delay: 50, size: 18, opacity: 0.65 },
  { x: 62, y: 38, dx: 22, dy: -92, rot: 22, delay: 170, size: 24, opacity: 0.55 },
  { x: 80, y: 56, dx: -12, dy: -60, rot: -16, delay: 110, size: 20, opacity: 0.6 },
  { x: 52, y: 22, dx: 6, dy: -48, rot: 4, delay: 230, size: 14, opacity: 0.45 },
];

function HeartIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-full h-full"
    >
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  );
}

type RotatingScriptProps = {
  className?: string;
  intervalMs?: number;
  fadeMs?: number;
};

export function RotatingScript({
  className = "",
  intervalMs = 2800,
  fadeMs = 380,
}: RotatingScriptProps) {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const [transitionKey, setTransitionKey] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const tick = setInterval(() => {
      setVisible(false);
      setHasStarted(true);
      setTransitionKey((k) => k + 1);
      timeoutRef.current = setTimeout(() => {
        setIndex((i) => (i + 1) % WORDS.length);
        setVisible(true);
      }, fadeMs);
    }, intervalMs);

    return () => {
      clearInterval(tick);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [intervalMs, fadeMs]);

  return (
    <span className={`relative inline-block ${className}`}>
      {hasStarted && (
        <span className="absolute inset-0 pointer-events-none" aria-hidden>
          {HEARTS.map((h, i) => (
            <span
              key={`${transitionKey}-${i}`}
              className="heart-float absolute text-rose"
              style={
                {
                  left: `${h.x}%`,
                  top: `${h.y}%`,
                  width: h.size,
                  height: h.size,
                  "--dx": `${h.dx}px`,
                  "--dy": `${h.dy}px`,
                  "--rot": `${h.rot}deg`,
                  "--peak-opacity": h.opacity,
                  animationDelay: `${h.delay}ms`,
                } as CSSProperties
              }
            >
              <HeartIcon />
            </span>
          ))}
        </span>
      )}
      <span
        style={{ transitionDuration: `${fadeMs}ms` }}
        className={`font-script transition-opacity block ${visible ? "opacity-100" : "opacity-0"}`}
      >
        {WORDS[index]}
      </span>
    </span>
  );
}
