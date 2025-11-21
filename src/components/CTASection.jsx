export default function CTASection() {
  return (
    <section className="py-24 bg-gradient-to-b from-gray-900 to-black text-center border-t border-gray-800">
      <h2 className="text-4xl font-bold mb-4 text-white">
        Ready to Build the Future?
      </h2>

      <p className="text-gray-300 max-w-2xl mx-auto mb-8 text-lg">
        Start integrating AI-powered scoring, anomaly detection, and intelligent
        automation into your applications today.
      </p>

      <div className="flex justify-center gap-6 mt-8 flex-wrap">
        <a
          href="https://app.revolutiontomorrow.cloud"
          className="px-10 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-lg font-semibold"
        >
          Go to Admin Console
        </a>

        <a
          href="#api"
          className="px-10 py-3 bg-gray-800 border border-gray-700 hover:border-cyber rounded-lg text-lg font-semibold"
        >
          Try the API Demo
        </a>
      </div>
    </section>
  );
}
