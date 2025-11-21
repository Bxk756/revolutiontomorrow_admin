export default function SectionWrapper({ id, children }) {
  return (
    <section
      id={id}
      className="max-w-6xl mx-auto py-20 px-6 border-b border-gray-800"
    >
      {children}
    </section>
  );
}
