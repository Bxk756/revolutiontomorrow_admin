import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function SystemHealthTimeline() {
  const [timeline, setTimeline] = useState([]);

  async function loadTimeline() {
    try {
      const res = await fetch("/api/system_health_timeline");
      const json = await res.json();
      setTimeline(json || []);
    } catch (err) {
      console.error("Health timeline error:", err);
    }
  }

  useEffect(() => {
    loadTimeline();
  }, []);

  return (
    <div className="bg-[#111622] p-6 rounded-xl shadow border border-gray-800 mb-10 h-72">
      <h2 className="text-lg font-semibold text-gray-200 mb-3">
        System Health Timeline
      </h2>

      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={timeline}>
          <CartesianGrid stroke="#1f2937" />
          <XAxis dataKey="time" stroke="#6b7280" />
          <YAxis stroke="#6b7280" />
          <Tooltip />
          <Line type="monotone" dataKey="cpu" stroke="#F59E0B" dot={false} />
          <Line type="monotone" dataKey="memory" stroke="#3B82F6" dot={false} />
          <Line type="monotone" dataKey="latency" stroke="#10B981" dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
