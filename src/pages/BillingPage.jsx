import React from "react";
import DashboardLayout from "../dashboard/DashboardLayout";
import BillingButton from "../components/BillingButton";

export default function BillingPage() {
  return (
    <DashboardLayout title="Billing & Subscription">
      <div className="bg-[#0f1420] p-6 md:p-8 border border-gray-800 rounded-xl shadow max-w-xl mx-auto animate-fadeIn">

        <h2 className="text-2xl font-bold mb-3 text-white">
          Your Subscription
        </h2>

        <p className="text-gray-300 text-sm leading-relaxed mb-6">
          Manage your plan, view billing details, change tiers,
          and update your payment information.
        </p>

        {/* Billing CTA */}
        <div className="flex flex-col items-start gap-3">
          <BillingButton />
        </div>

        <div className="mt-6 text-gray-500 text-xs">
          Secure payments processed by Stripe.
        </div>
      </div>
    </DashboardLayout>
  );
}

