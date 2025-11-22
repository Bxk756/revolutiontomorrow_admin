import React, { useState } from "react";

export default function BillingButton() {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  function handleBilling() {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpen(true);
    }, 900);
  }

  return (
    <>
      <button
        onClick={handleBilling}
        disabled={loading}
        className={`px-4 py-2 rounded-lg font-semibold hover-glow transition ${
          loading ? "bg-gray-700" : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {loading ? "Opening Billing…" : "Billing & Plan"}
      </button>

      {open && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center animate-fadeIn">
          <div className="panel p-8 max-w-md w-full animate-fadeIn">
            <h2 className="text-xl font-bold mb-4">Billing Center</h2>
            <p className="text-gray-300 mb-6 text-sm">
              You are currently on the <strong>Admin Premium</strong> plan.  
              Manage your subscription using the button below.
            </p>

            <button
              onClick={() => window.open("https://billing.stripe.com", "_blank")}
              className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition"
            >
              Open Stripe Billing Portal
            </button>

            <button
              onClick={() => setOpen(false)}
              className="mt-4 text-gray-400 hover:text-white text-sm"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}

