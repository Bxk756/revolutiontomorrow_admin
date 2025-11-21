import React from "react";
import DashboardLayout from "../dashboard/DashboardLayout";

export default function BillingSuccess() {
  return (
    <DashboardLayout title="Subscription Active">
      <div className="bg-[#111622] p-6 rounded-xl border border-gray-800 shadow max-w-xl">
        <h2 className="text-xl font-semibold mb-3">You're all set!</h2>

        <p className="text-gray-300 mb-4">
          Your subscription has been successfully activated. You now have full
          access to premium API usage.
        </p>

        <div className="text-sm text-gray-400">
          You may now close this page or return to the dashboard.
        </div>
      </div>
    </DashboardLayout>
  );
}
