export default function Card({ children, title }) {
  return (
    <div className="bg-gray-900/60 p-6 rounded-xl border border-gray-700 shadow-lg">
      {title && (
        <h3 className="text-2xl font-semibold mb-3 text-white">{title}</h3>
      )}
      <div className="text-gray-300 text-sm">{children}</div>
    </div>
  );
}
