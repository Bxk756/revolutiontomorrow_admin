import React from "react";
import DashboardLayout from "../dashboard/DashboardLayout";
import EventsTable from "../dashboard/EventsTable";

export default function LogsPage() {
  return (
    <DashboardLayout title="Event Logs">
      <EventsTable />
    </DashboardLayout>
  );
}
