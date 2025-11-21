import React from "react";

export default function InputHighlighter({ text }) {
  if (!text) return <p className="text-gray-400">No input text.</p>;

  const tokens = text.split(/(\s+)/); // preserve spacing

  const dangerWords = ["attack", "harm", "kill", "bomb", "exploit", "breach"];
  const warnWords = ["password", "token", "login", "database", "access"];

  function classForWord(w) {
    const lower = w.toLowerCase();
    if (dangerWords.includes(lower))
      return "bg-red-600 text-white px-1 rounded";
    if (warnWords.includes(lower))
      return "bg-yellow-500 text-black px-1 rounded";
    return "";
  }

  return (
    <p className="leading-relaxed text-sm text-gray-300">
      {tokens.map((tok, i) => {
        const cls = classForWord(tok.trim());
        return (
          <span key={i} className={cls}>
            {tok}
          </span>
        );
      })}
    </p>
  );
}
