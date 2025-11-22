export async function askAI(prompt) {
  try {
    const res = await fetch("http://localhost:3001/ai", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt })
    });

    const data = await res.json();
    return data.output || "No response from AI";
  } catch (err) {
    console.error("AI error:", err);
    return "AI connection failed. Is your proxy running?";
  }
}
