import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();
app.use(cors());
app.use(express.json());

// Cloud Shell Ollama endpoint
const PHI_URL = "https://11434-cs-849131389532-default.cs-us-east1-rtep.cloudshell.dev/api/generate";

// 1) Basic Phi generate
app.post("/api/phi", async (req, res) => {
  const { prompt } = req.body;

  try {
    const response = await fetch(PHI_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "phi",
        prompt,
        stream: false,
      }),
    });

    const data = await response.json();
    return res.json({ output: data.response });
  } catch (error) {
    console.error("Phi error:", error);
    return res.status(500).json({ error: "Phi request failed" });
  }
});

app.listen(3001, () => {
  console.log("AI Proxy running at http://localhost:3001");
});



         

    

 
