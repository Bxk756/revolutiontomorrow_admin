import React from "react";
import DashboardLayout from "../dashboard/DashboardLayout";
import UsageSummary from "../dashboard/UsageSummary";
import EventsTable from "../dashboard/EventsTable";

export default function DashboardPage() {
  return (
    <DashboardLayout title="Dashboard Overview">
      {/* Usage Metrics */}
      <UsageSummary />

      {/* Events Log */}
      <EventsTable />
    </DashboardLayout>
  );
}
