import { AdminTablePage } from '@/components/admin/AdminTablePage';

const rows = [
  { id: 'pf-001', title: 'Investor u-002', meta: 'Total 500 IDRX', status: 'healthy' },
  { id: 'pf-002', title: 'Investor u-003', meta: 'Total 120 IDRX', status: 'pending' },
  { id: 'pf-003', title: 'Investor u-004', meta: 'Total 980 IDRX', status: 'healthy' },
];

export default function PortfoliosAdminPage() {
  return (
    <AdminTablePage
      badge="Admin • Portfolios"
      title="Portfolios & stats"
      description="Review investor portfolios, global statistics, and leaderboards to monitor RWA-Fi performance."
      active="portfolios"
      rows={rows}
    />
  );
}
