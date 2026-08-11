"use client";

import { useEffect, useState } from "react";

/** Cycles through words with a type / erase effect. */
export default function Typewriter({
  words,
  className = "",
  typeMs = 85,
  eraseMs = 40,
  holdMs = 1600,
}: {
  words: string[];
  className?: string;
  typeMs?: number;
  eraseMs?: number;
  holdMs?: number;
}) {
  const [i, setI] = useState(0);
  const [text, setText] = useState("");
  const [phase, setPhase] = useState<"type" | "hold" | "erase">("type");

  useEffect(() => {
    const word = words[i % words.length];

    if (phase === "type") {
      if (text === word) {
        const t = setTimeout(() => setPhase("hold"), 0);
        return () => clearTimeout(t);
      }
      const t = setTimeout(() => setText(word.slice(0, text.length + 1)), typeMs);
      return () => clearTimeout(t);
    }

    if (phase === "hold") {
      const t = setTimeout(() => setPhase("erase"), holdMs);
      return () => clearTimeout(t);
    }

    if (text === "") {
      const t = setTimeout(() => {
        setI((v) => v + 1);
        setPhase("type");
      }, 0);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setText(text.slice(0, -1)), eraseMs);
    return () => clearTimeout(t);
  }, [text, phase, i, words, typeMs, eraseMs, holdMs]);

  return (
    <span className={className}>
      {text}
      <span className="ml-1 inline-block w-[0.06em] animate-pulse bg-current align-middle" style={{ height: "0.8em" }} />
    </span>
  );
}
