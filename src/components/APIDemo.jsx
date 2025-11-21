import { useState } from "react";

export default function APIDemo() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState(null);

  async function callAPI() {
    try {
      const res = await fetch("https://api.revolutiontomorrow.cloud/score", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input }),
      });

      const data = await res.json();
      setResponse(data);
    } catch (err) {
      setResponse({ error: "API unreachable" });
    }
  }

  return (
    <section id="api" className="bg-black/80 py-20 text-center">
      <h2 className="text-4xl font-bold mb-6">API Demo</h2>
      <p className="text-gray-300 mb-8">
        Try the Revolution Tomorrow scoring API in real time.
      </p>

      <div className="max-w-xl mx-auto">
        <input
          type="text"
          placeholder="Enter text…"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full p-3 rounded bg-gray-900 border border-gray-700 text-white"
        />

        <button
          onClick={callAPI}
          className="mt-4 px-8 py-3 bg-blue-600 hover:bg-blue-700 text-lg rounded-lg"
        >
          Run Score
        </button>

        {response && (
          <pre className="mt-6 bg-gray-900 p-4 rounded text-left text-sm border border-gray-700 overflow-x-auto">
{JSON.stringify(response, null, 2)}
          </pre>
        )}
      </div>
    </section>
  );
}
