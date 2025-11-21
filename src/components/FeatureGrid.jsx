export default function FeatureGrid() {
  const features = [
    {
      title: "Edge AI Processing",
      desc: "Real-time inference running globally on Cloudflare edge locations.",
    },
    {
      title: "Threat Intelligence",
      desc: "Adaptive anomaly scoring powered by synthetic training pipelines.",
    },
    {
      title: "Unified Admin Console",
      desc: "A single dashboard for API keys, logs, telemetry, and model insights.",
    },
    {
      title: "Developer Ready",
      desc: "Simple REST endpoints designed for fast integration.",
    },
  ];

  return (
    <section className="py-20 bg-black border-t border-gray-800">
      <h2 className="text-4xl font-bold text-center mb-12">Next-Generation Features</h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 max-w-6xl mx-auto px-6">
        {features.map((f) => (
          <div
            key={f.title}
            className="bg-gray-900/60 p-6 rounded-xl border border-gray-700 hover:border-cyber transition"
          >
            <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
            <p className="text-gray-300 text-sm">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

