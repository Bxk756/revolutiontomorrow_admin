export default function Footer() {
  return (
    <footer className="bg-black text-center py-10 mt-20 border-t border-gray-800">
      <p className="text-gray-400 text-sm">
        © {new Date().getFullYear()} Revolution Tomorrow Cloud • A Swarm Shield Initiative
      </p>

      <p className="text-gray-600 text-xs mt-2">
        Built on Cloudflare Edge • AI Automation Platform
      </p>
    </footer>
  );
}
