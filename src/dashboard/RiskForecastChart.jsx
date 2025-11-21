import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  YAxis,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export default function RiskForecastChart() {
  const [forecast, setForecast] = useState([]);

  async function loadForecast() {
    try {
      const res = await fetch("/api/risk_forecast");
      const json = await res.json();
      setForecast(json || []);
    } catch (err) {
      console.error("Forecast error:", err);
    }
  }

  useEffect(() => {
    loadForecast();
  }, []);

  return (
    <div className="bg-[#111622] p-6 rounded-xl border border-gray-800 shadow mb-10 h-72">
      <h2 className="text-lg font-semibold text-gray-200 mb-4">
        Risk Forecast (Next 7 Days)
      </h2>

      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={forecast}>
          <CartesianGrid stroke="#1f2937" />
          <XAxis dataKey="date" stroke="#6b7280" />
          <YAxis stroke="#6b7280" />
          <Tooltip />

          <Line
            type="monotone"
            dataKey="predicted_risk"
            stroke="#F59E0B"
            strokeWidth={2}
            dot={false}
          />

          <Line
            type="monotone"
            dataKey="confidence_low"
            stroke="#3B82F633"
            strokeWidth={1}
            dot={false}
          />

          <Line
            type="monotone"
            dataKey="confidence_high"
            stroke="#3B82F633"
            strokeWidth={1}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
