import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();
app.use(cors());
app.use(express.json());

// 1) Basic single-shot AI call (already had this)
app.post("/ai", async (req, res) => {
  const { prompt } = req.body;

  try {
    const response = await fetch("http://localhost:11434/api/generate", {
      method: "POST",
      body: JSON.stringify({
        model: "phi",
        prompt,
        stream: false,
      }),
    });

    const data = await response.json();
    res.json({ output: data.response });
  } catch (err) {
    console.error("AI error:", err);
    res.status(500).json({ error: "AI proxy error" });
  }
});

// 2) Streaming endpoint for live token output
app.post("/ai/stream", async (req, res) => {
  const { prompt } = req.body;

  try {
    const upstream = await fetch("http://localhost:11434/api/generate", {
      method: "POST",
      body: JSON.stringify({
        model: "phi",
        prompt,
        stream: true,
      }),
    });

    // Set up a very simple "event-like" text stream
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    const reader = upstream.body.getReader();
    const decoder = new TextDecoder();
    let buffer = "";

    while (true) {
      const { value, done } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value, { stream: true });
      buffer += chunk;

      const lines = buffer.split("\n");
      buffer = lines.pop() || "";

      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed) continue;

        try {
          const json = JSON.parse(trimmed);
          if (json.response) {
            // send each piece as "data: <text>\n\n"
            res.write(`data: ${json.response}\n\n`);
          }
          if (json.done) {
            res.write("data: [DONE]\n\n");
          }
        } catch (e) {
          // ignore parse errors on partial lines
        }
      }
    }

    res.end();
  } catch (err) {
    console.error("AI stream error:", err);
    res.status(500).end();
  }
});

app.listen(3001, () => {
  console.log("AI Proxy running on http://localhost:3001");
});
