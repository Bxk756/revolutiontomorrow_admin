// src/utils/ai.js

// Simple one-shot AI call
export async function askAI(prompt) {
  try {
    const res = await fetch("http://localhost:3001/ai", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });

    const data = await res.json();
    return data.output || "No response from AI.";
  } catch (err) {
    console.error("askAI error:", err);
    return "AI connection failed. Is the proxy running?";
  }
}

// Auto-SOC report helper (Option #4)
export async function askAIReport(rawEventsText) {
  const prompt = `
You are a senior SOC analyst for a K-12 / public sector security platform (Swarm Shield).

Given the following raw logs / events, create a clear SOC report with sections:

1) Executive Summary (non-technical, 2–3 sentences)
2) Key Events Timeline (bulleted, with rough times if present)
3) Threat Assessment (likelihood, impact, severity 1–5)
4) Notable Indicators or Anomalies
5) Recommended Actions (bulleted list)
6) Notes for School / District Administrators (plain language)

RAW EVENTS / LOGS:
${rawEventsText}
`;

  return askAI(prompt);
}

// Streaming AI helper (Option #3)
export function streamAI(prompt, { onChunk, onDone, onError } = {}) {
  const controller = new AbortController();

  fetch("http://localhost:3001/ai/stream", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt }),
    signal: controller.signal,
  })
    .then(async (res) => {
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });

        const parts = buffer.split("\n\n");
        buffer = parts.pop() || "";

        for (const part of parts) {
          const line = part.trim();
          if (!line.startsWith("data:")) continue;

          const payload = line.replace(/^data:\s*/, "");
          if (payload === "[DONE]") {
            onDone && onDone();
          } else {
            onChunk && onChunk(payload);
          }
        }
      }

      onDone && onDone();
    })
    .catch((err) => {
      console.error("streamAI error:", err);
      onError && onError(err);
    });

  // return a cancel function
  return () => controller.abort();
}

      
   

 
