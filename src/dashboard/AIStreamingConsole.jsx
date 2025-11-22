// src/dashboard/AIStreamingConsole.jsx
import React, { useState } from "react";
import { streamAI } from "../utils/ai.js";

export default function AIStreamingConsole() {
  const [prompt, setPrompt] = useState("");
  const [output, setOutput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const [cancelFn, setCancelFn] = useState(null);

  const startStream = () => {
    setOutput("");
    setStreaming(true);

    const cancel = streamAI(prompt, {
      onChunk: (chunk) => {
        setOutput((prev) => prev + chunk);
      },
      onDone: () => {
        setStreaming(false);
      },
      onError: () => {
        setStreaming(false);
      },
    });

    setCancelFn(() => cancel);
  };

  const stopStream = () => {
    if (cancelFn) cancelFn();
    setStreaming(false);
  };

  return (
    <div className="panel p-6 space-y-4">
      <h2 className="text-lg font-semibold">AI Streaming Console</h2>
      <p className="text-xs text-slate-400">
        Sends your prompt to the local Phi model and streams tokens back in real-time.
      </p>

      <textarea
        className="w-full h-28 p-3 bg-slate-900 border border-slate-700 rounded-xl text-sm"
        placeholder="Ask the SOC AI anything…"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />

      <div className="flex gap-2">
        <button
          onClick={startStream}
          disabled={streaming || !prompt.trim()}
          className="px-4 py-2 bg-blue-600 rounded-xl text-sm hover:bg-blue-700 disabled:opacity-50"
        >
          {streaming ? "Streaming…" : "Start Stream"}
        </button>
        {streaming && (
          <button
            onClick={stopStream}
            className="px-4 py-2 bg-slate-700 rounded-xl text-sm hover:bg-slate-600"
          >
            Stop
          </button>
        )}
      </div>

      <div className="mt-4 h-48 bg-slate-900 border border-slate-700 rounded-xl p-3 text-sm overflow-auto whitespace-pre-wrap">
        {output || (
          <span className="text-slate-600 text-xs">
            Streamed AI output will appear here…
          </span>
        )}
      </div>
    </div>
  );
}
