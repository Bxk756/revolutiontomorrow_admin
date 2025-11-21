import React from "react";
import DashboardLayout from "../dashboard/DashboardLayout";

import DashboardCards from "../dashboard/DashboardCards";
import AnalyticsChart from "../dashboard/AnalyticsChart";
import RiskDistributionChart from "../dashboard/RiskDistributionChart";
import EventsTable from "../dashboard/EventsTable";
import TopbarFilters from "../dashboard/TopbarFilters";
import DashboardGridLayout from "../dashboard/DashboardGridLayout";

export default function DashboardPage() {
  return (
    <DashboardLayout title="Dashboard Overview">
      <TopbarFilters />

      <DashboardGridLayout>
        <DashboardCards />
        <AnalyticsChart />
        <RiskDistributionChart />
        <EventsTable />
      </DashboardGridLayout>
    </DashboardLayout>
  );
}
