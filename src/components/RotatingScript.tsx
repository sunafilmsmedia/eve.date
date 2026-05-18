"use client";

import { useEffect, useRef, useState } from "react";

const WORDS = [
  "sublimées",
  "romantisées",
  "organisées",
  "imaginées",
  "enchantées",
  "réinventées",
  "inspirées",
  "magnifiées",
];

type RotatingScriptProps = {
  className?: string;
  intervalMs?: number;
  fadeMs?: number;
};

export function RotatingScript({
  className = "",
  intervalMs = 2600,
  fadeMs = 320,
}: RotatingScriptProps) {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const tick = setInterval(() => {
      setVisible(false);
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
    <span
      style={{ transitionDuration: `${fadeMs}ms` }}
      className={`font-script transition-opacity ${visible ? "opacity-100" : "opacity-0"} ${className}`}
    >
      {WORDS[index]}
    </span>
  );
}
