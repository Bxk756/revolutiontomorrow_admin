export default function Navbar() {
  return (
    <nav className="w-full py-4 px-6 bg-black/70 backdrop-blur border-b border-gray-800 fixed top-0 left-0 z-50">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <h1 className="text-xl font-bold text-white">Revolution Tomorrow</h1>

        <ul className="hidden md:flex items-center gap-6 text-gray-300 text-sm">
          <li><a href="#features" className="hover:text-white">Features</a></li>
          <li><a href="#api" className="hover:text-white">API Demo</a></li>
          <li><a href="/" className="hover:text-white">Docs</a></li>
          <li><a href="https://app.revolutiontomorrow.cloud" className="hover:text-cyber">
            Admin
          </a></li>
        </ul>

        <button className="md:hidden border border-gray-700 px-3 py-1 rounded text-gray-300">
          Menu
        </button>
      </div>
    </nav>
  );
}
