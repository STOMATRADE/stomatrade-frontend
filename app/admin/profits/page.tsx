import { AdminTablePage } from '@/components/admin/AdminTablePage';

const rows = [
  { id: 'pr-001', title: 'Deposit profit p-001', meta: '50 IDRX', status: 'queued' },
  { id: 'pr-002', title: 'Claim profit u-002 / p-002', meta: '12 IDRX', status: 'completed' },
  { id: 'pr-003', title: 'Profit pool p-003', meta: '0.8 ETH', status: 'open' },
];

export default function ProfitsAdminPage() {
  return (
    <AdminTablePage
      badge="Admin • Profits"
      title="Profit distribution"
      description="Manage profit deposits and user claims flowing from RWA projects to investors."
      active="profits"
      rows={rows}
    />
  );
}
