export default function Features() {
  const items = [
    {
      title: "AI-Powered Insights",
      text: "Real-time analysis pipelines for threat detection, automation, and system intelligence.",
    },
    {
      title: "Developer-Ready APIs",
      text: "Simple, modern endpoints designed for speed, scale, and reliability.",
    },
    {
      title: "Cloudflare Optimized",
      text: "Ultra-low latency delivery with global edge deployment and security.",
    },
  ];

  return (
    <section className="bg-black/60 py-20">
      <h2 className="text-4xl font-bold text-center mb-12">Platform Features</h2>

      <div className="grid md:grid-cols-3 gap-10 max-w-5xl mx-auto">
        {items.map((f) => (
          <div
            key={f.title}
            className="bg-gray-900/60 p-6 rounded-xl border border-gray-700 text-center"
          >
            <h3 className="text-2xl font-semibold mb-3">{f.title}</h3>
            <p className="text-gray-300">{f.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
