import React, { useState } from "react";
import { apiPost } from "../dashboard/apiClient";

export default function BillingButton() {
  const [loading, setLoading] = useState(false);

  async function handleSubscribe() {
    setLoading(true);

    try {
      const res = await apiPost("/billing/create-checkout-session", {});
      if (res?.url) {
        window.location.href = res.url;
      } else {
        console.error("Invalid Stripe response:", res);
        alert("Billing error — please try again");
      }
    } catch (err) {
      console.error("Billing error:", err);
      alert("Billing error: " + err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleSubscribe}
      disabled={loading}
      className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-semibold shadow 
                 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {loading ? "Redirecting…" : "Upgrade Plan"}
    </button>
  );
}
