import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();
app.use(cors());
app.use(express.json());

// Cloud Shell Ollama public endpoint
const PHI_URL =
  "https://11434-cs-849131389532-default.cs-us-east1-rtep.cloudshell.dev/api/generate";

// ---------------------------------------------
//   Phi Generate — Stable, Non-Streaming Mode
// ---------------------------------------------
app.post("/api/phi", async (req, res) => {
  const { prompt } = req.body;

  if (!prompt || prompt.trim() === "") {
    return res.status(400).json({ error: "Prompt is required" });
  }

  try {
    const response = await fetch(PHI_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",      // ← important for Cloud Shell proxy
      },
      body: JSON.stringify({
        model: "phi",
        prompt,
        stream: false,                     // ← keep false unless you build a streaming endpoint
      }),
    });

    // If Ollama errors, return the raw message
    if (!response.ok) {
      const text = await response.text();
      console.error("Phi Error Response:", text);
      return res.status(500).json({
        error: "Phi API returned non-OK status",
        raw: text,
      });
    }

    const data = await response.json();

    return res.json({
      success: true,
      output: data.response ?? "",
      raw: data,
    });
  } catch (error) {
    console.error("Phi Fetch Error:", error);
    return res.status(500).json({
      error: "Phi request failed",
      detail: error.message,
    });
  }
});

// ---------------------------------------------
//   Server Start
// ---------------------------------------------
app.listen(3001, () => {
  console.log("AI Proxy running at http://localhost:3001");
});

 
