export default function APICodeSample() {
  const sample = `curl -X POST https://api.revolutiontomorrow.cloud/score \\
  -H "Content-Type: application/json" \\
  -d '{
    "input": "User attempted admin privilege escalation"
  }'`;

  return (
    <section className="py-20 bg-black border-t border-gray-800">
      <h2 className="text-4xl font-bold text-center mb-10 text-white">
        API Code Sample
      </h2>

      <div className="max-w-3xl mx-auto bg-gray-900/60 p-6 rounded-xl border border-gray-700">
        <pre className="text-sm text-cyber whitespace-pre-wrap overflow-x-auto">
{sample}
        </pre>
      </div>
    </section>
  );
}
