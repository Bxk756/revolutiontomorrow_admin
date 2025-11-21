import React from "react";
import DashboardLayout from "../dashboard/DashboardLayout";
import BillingButton from "../components/BillingButton";

export default function BillingPage() {
  return (
    <DashboardLayout title="Billing & Subscription">
      <div className="bg-[#111622] p-6 border border-gray-800 rounded-xl shadow max-w-xl">
        <h2 className="text-xl font-semibold mb-3">Your Subscription</h2>
        <p className="text-gray-400 mb-6 text-sm">
          Manage your plan, billing, and subscription options.
        </p>

        <BillingButton />

        <div className="mt-6 text-gray-400 text-xs">
          Secure payments powered by Stripe.
        </div>
      </div>
    </DashboardLayout>
  );
}
