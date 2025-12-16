import React from "react";

/**
 * Layout
 */
import DashboardLayout from "../dashboard/DashboardLayout";

/**
 * Header / Controls
 */
import DashboardHeader from "../dashboard/DashboardHeader";
import TopbarFilters from "../dashboard/TopbarFilters";
import RiskBadgeLegend from "../dashboard/RiskBadgeLegend";

/**
 * Layout Helpers
 */
import DashboardGridLayout from "../dashboard/DashboardGridLayout";
import DashboardSection from "../dashboard/DashboardSection";

/**
 * Panels / Widgets
 */
import DashboardCards from "../dashboard/DashboardCards";
import SLAStatusPanel from "../dashboard/SLAStatusPanel";
import EventsTableEnhanced from "../dashboard/EventsTableEnhanced";

/**
 * Charts
 */
import AnalyticsChart from "../dashboard/AnalyticsChart";
import RiskDistributionChart from "../dashboard/RiskDistributionChart";
import RiskTrendChart from "../dashboard/RiskTrendChart";
import EventTypeBreakdown from "../dashboard/EventTypeBreakdown";

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

        <DashboardSection title="Service Level Status">
          <SLAStatusPanel />
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
          <EventsTableEnhanced />
        </DashboardSection>
      </DashboardGridLayout>
    </DashboardLayout>
  );
}
