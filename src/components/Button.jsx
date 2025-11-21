export default function Button({ children, onClick, href, className = "" }) {
  const base =
    "px-6 py-3 rounded-lg font-semibold transition text-white bg-blue-600 hover:bg-blue-700";

  if (href) {
    return (
      <a href={href} className={`${base} ${className}`}>
        {children}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={`${base} ${className}`}>
      {children}
    </button>
  );
}
