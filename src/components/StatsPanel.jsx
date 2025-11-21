export default function StatsPanel() {
  const stats = [
    { label: "Edge Locations", value: "310+" },
    { label: "Average Latency", value: "41ms" },
    { label: "API Reliability", value: "99.98%" },
    { label: "Events Processed / Day", value: "182k+" },
  ];

  return (
    <section className="py-20 bg-black border-y border-gray-800">
      <h2 className="text-4xl font-bold text-center mb-10 text-white">
        Trusted Global Performance
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-10 max-w-5xl mx-auto px-6">
        {stats.map((s) => (
          <div
            key={s.label}
            className="text-center bg-gray-900/60 p-6 rounded-xl border border-gray-700"
          >
            <p className="text-3xl font-bold text-cyber mb-2">{s.value}</p>
            <p className="text-gray-400 text-sm">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
