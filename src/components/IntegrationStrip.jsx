export default function IntegrationStrip() {
  const logos = [
    "Cloudflare",
    "OpenAI",
    "Vercel",
    "Supabase",
    "Google Cloud",
  ];

  return (
    <section className="py-16 bg-black border-t border-gray-800">
      <p className="text-center text-gray-400 text-sm mb-6 uppercase tracking-widest">
        Integrates with your existing stack
      </p>

      <div className="flex items-center justify-center gap-10 flex-wrap opacity-80">
        {logos.map((name) => (
          <div
            key={name}
            className="text-gray-500 text-lg font-semibold border border-gray-800 px-6 py-3 rounded-lg bg-gray-900/40"
          >
            {name}
          </div>
        ))}
      </div>
    </section>
  );
}
