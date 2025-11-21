export default function Hero() {
  return (
    <section className="bg-gradient-to-b from-blue-900/40 to-black text-center py-24">
      <h1 className="text-5xl font-extrabold mb-4">
        Revolution Tomorrow Starts Today
      </h1>

      <p className="text-lg max-w-2xl mx-auto text-gray-300">
        AI systems engineered to accelerate innovation, secure digital infrastructure,
        and unlock the next era of intelligent automation.
      </p>

      <div className="mt-8">
        <a
          href="#api"
          className="px-8 py-3 text-lg bg-blue-600 hover:bg-blue-700 rounded-lg transition"
        >
          Explore the API
        </a>
      </div>
    </section>
  );
}
