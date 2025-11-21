import React, { useMemo } from "react";

export default function EventTags({ event }) {
  const tags = useMemo(() => {
    const t = [];

    if (!event) return t;

    const text = (event.input_snip || "").toLowerCase();

    // Pattern-based tags
    if (text.includes("attack") || text.includes("exploit")) t.push("Threat Intel");
    if (text.includes("password") || text.includes("login")) t.push("Auth");
    if (text.includes("kill") || text.includes("harm")) t.push("Safety");
    if (event.risk_level === "critical") t.push("Critical");
    if (event.risk_level === "high") t.push("High Risk");
    if (!t.length) t.push("General");

    return t;
  }, [event]);

  return (
    <div className="flex gap-2 flex-wrap mt-2">
      {tags.map((tag) => (
        <span
          key={tag}
          className="bg-blue-600 text-white text-xs px-2 py-1 rounded-lg"
        >
          {tag}
        </span>
      ))}
    </div>
  );
}
