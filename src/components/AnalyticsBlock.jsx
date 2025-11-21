export default function AnalyticsBlock() {
  const stats = [
    { label: "Daily Events", value: "182,304+" },
    { label: "AI Detections", value: "421 high-risk" },
    { label: "Global Latency", value: "41ms p95" },
    { label: "API Uptime", value: "99.98%" },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-black to-gray-900 border-t border-gray-800">
      <h2 className="text-4xl font-bold text-center mb-12">Platform Metrics</h2>

      <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto px-6">
        {stats.map((item) => (
          <div
            key={item.label}
            className="p-6 rounded-xl bg-gray-900/60 border border-gray-700 text-center"
          >
            <p className="text-3xl font-bold text-cyber">{item.value}</p>
            <p className="text-gray-300 mt-2 text-sm">{item.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
