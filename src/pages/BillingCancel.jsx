import React from "react";
import DashboardLayout from "../dashboard/DashboardLayout";

export default function BillingCancel() {
  return (
    <DashboardLayout title="Checkout Canceled">
      <div className="bg-[#111622] p-6 rounded-xl border border-gray-800 shadow max-w-xl">
        <h2 className="text-xl font-semibold mb-3">Checkout Canceled</h2>

        <p className="text-gray-300 mb-4">
          Your subscription checkout was canceled before completion. You can try
          again at any time.
        </p>

        <div className="text-sm text-gray-400">
          If this was a mistake, simply go back to the Billing page and restart.
        </div>
      </div>
    </DashboardLayout>
  );
}
