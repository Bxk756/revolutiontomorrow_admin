import React, { useEffect, useState } from "react";
import {
  AreaChart,
  Area,
  ResponsiveContainer,
  Tooltip,
  CartesianGrid,
  YAxis,
  XAxis,
} from "recharts";

export default function NetworkIOChart() {
  const [data, setData] = useState([]);

  async function loadIO() {
    try {
      const res = await fetch("/api/network_io");
      const json = await res.json();
      setData(json || []);
    } catch (err) {
      console.error("Network IO error:", err);
    }
  }

  useEffect(() => {
    loadIO();
    const int = setInterval(loadIO, 15000);
    return () => clearInterval(int);
  }, []);

  return (
    <div className="bg-[#111622] p-6 rounded-xl border border-gray-800 shadow mb-10 h-72">
      <h2 className="text-lg font-semibold text-gray-200 mb-4">
        Network I/O (Ingress / Egress)
      </h2>

      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <CartesianGrid stroke="#1f2937" />
          <XAxis dataKey="time" stroke="#6b7280" />
          <YAxis stroke="#6b7280" />
          <Tooltip />

          <Area
            type="monotone"
            dataKey="ingress"
            stroke="#10B981"
            fill="#10B98133"
            strokeWidth={2}
          />

          <Area
            type="monotone"
            dataKey="egress"
            stroke="#3B82F6"
            fill="#3B82F633"
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
