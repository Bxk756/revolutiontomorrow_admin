import React from "react";
import DashboardLayout from "../dashboard/DashboardLayout";

import DashboardHeader from "../dashboard/DashboardHeader";
import DashboardSection from "../dashboard/DashboardSection";
import DashboardCards from "../dashboard/DashboardCards";
import AnalyticsChart from "../dashboard/AnalyticsChart";
import RiskDistributionChart from "../dashboard/RiskDistributionChart";
import RiskTrendChart from "../dashboard/RiskTrendChart";
import EventTypeBreakdown from "../dashboard/EventTypeBreakdown";
import EventsTable from "../dashboard/EventsTable";
import TopbarFilters from "../dashboard/TopbarFilters";
import DashboardGridLayout from "../dashboard/DashboardGridLayout";
import RiskBadgeLegend from "../dashboard/RiskBadgeLegend";

export default function DashboardPage() {
  return (
    <DashboardLayout title="Dashboard Overview">
      <DashboardHeader
        title="Analytics Dashboard"
        subtitle="Live API metrics, event intelligence, and risk activity"
      />

      <TopbarFilters />

      <RiskBadgeLegend />

      <DashboardGridLayout>
        <DashboardSection title="Summary">
          <DashboardCards />
        </DashboardSection>

        <DashboardSection title="Usage Over Time">
          <AnalyticsChart />
        </DashboardSection>

        <DashboardSection title="Risk Levels">
          <RiskDistributionChart />
        </DashboardSection>

        <DashboardSection title="Risk Trend Over Time">
          <RiskTrendChart />
        </DashboardSection>

        <DashboardSection title="Event Types">
          <EventTypeBreakdown />
        </DashboardSection>

        <DashboardSection title="Recent Events">
          <EventsTable />
        </DashboardSection>
      </DashboardGridLayout>
    </DashboardLayout>
  );
}
