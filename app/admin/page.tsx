import { AdminTablePage } from '@/components/admin/AdminTablePage';

const rows = [
  { id: 'u-001', title: '0x742d...f44E', meta: 'ADMIN', status: 'active' },
  { id: 'c-001', title: 'Collector John', meta: 'user u-003', status: 'verified' },
  { id: 'f-001', title: 'Farmer A', meta: 'collector c-001', status: 'active' },
  { id: 'p-001', title: 'Coffee Q1 Harvest', meta: 'collector c-001', status: 'submitted' },
];

export default function AdminOverviewPage() {
  return (
    <AdminTablePage
      badge="Admin Console"
      title="StoMaTrade Admin Overview"
      description="Landing view for admin operations. Use the sidebar to navigate resources; mock data shown for layout."
      active="overview"
      rows={rows}
    />
  );
}
