import React, { useState, useMemo } from "react";
import { useEvents } from "./useEvents";
import LoadingSpinner from "../components/LoadingSpinner";

function RiskBadge({ level }) {
  const colors = {
    low: "bg-gray-700 text-gray-200",
    elevated: "bg-yellow-600 text-black",
    high: "bg-orange-500 text-black",
    critical: "bg-red-600 text-white",
  };

  return (
    <span
      className={`px-2 py-1 rounded text-xs font-semibold ${
        colors[level] || "bg-gray-700"
      }`}
    >
      {level}
    </span>
  );
}

export default function EventsTableEnhanced() {
  const { events, loading, error } = useEvents();

  const [search, setSearch] = useState("");
  const [risk, setRisk] = useState("all");
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const filtered = useMemo(() => {
    let list = events;

    if (risk !== "all") {
      list = list.filter((e) => e.risk_level === risk);
    }

    if (search.trim()) {
      const s = search.toLowerCase();
      list = list.filter(
        (e) =>
          e.event_type.toLowerCase().includes(s) ||
          (e.input_snip || "").toLowerCase().includes(s)
      );
    }

    return list;
  }, [events, risk, search]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);

  if (loading) return <LoadingSpinner size={40} />;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="bg-[#111622] p-6 rounded-xl border border-gray-800 shadow">
      <div className="flex flex-wrap gap-4 mb-4 items-center">
        <input
          className="bg-gray-900 border border-gray-700 px-3 py-2 rounded text-sm w-60"
          placeholder="Search events..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
        />

        <select
          className="bg-gray-900 border border-gray-700 px-3 py-2 rounded text-sm"
          value={risk}
          onChange={(e) => {
            setRisk(e.target.value);
            setPage(1);
          }}
        >
          <option value="all">All Risks</option>
          <option value="low">Low</option>
          <option value="elevated">Elevated</option>
          <option value="high">High</option>
          <option value="critical">Critical</option>
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead>
            <tr className="text-gray-400 border-b border-gray-700">
              <th className="py-2">Time</th>
              <th className="py-2">Type</th>
              <th className="py-2">Risk</th>
              <th className="py-2">Snippet</th>
            </tr>
          </thead>
          <tbody>
            {paginated.map((evt) => (
              <tr key={evt.id} className="border-b border-gray-800">
                <td className="py-2 text-gray-300">{evt.ts}</td>
                <td className="py-2 text-gray-200">{evt.event_type}</td>
                <td className="py-2">
                  <RiskBadge level={evt.risk_level} />
                </td>
                <td className="py-2 text-gray-500">{evt.input_snip}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between mt-4 text-sm text-gray-400">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="px-3 py-1 bg-gray-800 rounded disabled:opacity-30"
        >
          Prev
        </button>

        <span>
          Page {page} of {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
          className="px-3 py-1 bg-gray-800 rounded disabled:opacity-30"
        >
          Next
        </button>
      </div>
    </div>
  );
}
