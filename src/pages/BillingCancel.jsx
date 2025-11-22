import React from "react";
import DashboardLayout from "../dashboard/DashboardLayout";

export default function BillingCancel() {
  return (
    <DashboardLayout title="Checkout Canceled">
      <div className="bg-[#0f1420] p-6 md:p-8 rounded-xl border border-gray-800 shadow max-w-xl mx-auto animate-fadeIn">
        <h2 className="text-2xl font-bold mb-3 text-white">Checkout Canceled</h2>

        <p className="text-gray-300 leading-relaxed mb-4">
          Your subscription checkout was canceled before completion. No charges
          were made. You can restart the process anytime.
        </p>

        <p className="text-gray-400 text-sm mb-6">
          If this was accidental, simply return to the Billing page to continue.
        </p>

        <div className="flex items-center gap-3">
          <a
            href="/billing"
            className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-sm text-white rounded-md transition duration-200"
          >
            Return to Billing
          </a>

          <a
            href="/"
            className="px-5 py-2 bg-gray-800 hover:bg-gray-700 text-sm text-gray-200 rounded-md transition duration-200"
          >
            Back to Dashboard
          </a>
        </div>
      </div>
    </DashboardLayout>
  );
}
