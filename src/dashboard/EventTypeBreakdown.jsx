import React from "react";
import { useEvents } from "./useEvents";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  CartesianGrid,
} from "recharts";

export default function EventTypeBreakdown() {
  const { events, loading, error } = useEvents();

  if (loading) return <p className="text-gray-400">Loading event types…</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!events || events.length === 0)
    return <p className="text-gray-500">No events available.</p>;

  const counts = {};

  events.forEach((evt) => {
    if (!counts[evt.event_type]) counts[evt.event_type] = 0;
    counts[evt.event_type] += 1;
  });

  const chartData = Object.keys(counts).map((type) => ({
    type,
    count: counts[type],
  }));

  return (
    <div className="bg-[#111622] p-6 rounded-xl border border-gray-800 shadow mb-10">
      <h2 className="text-lg font-semibold mb-4">Event Type Breakdown</h2>

      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <CartesianGrid stroke="#1e2636" />
            <XAxis dataKey="type" stroke="#6b7280" />
            <YAxis stroke="#6b7280" />
            <Tooltip />
            <Bar dataKey="count" fill="#3B82F6" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
