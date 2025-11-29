import { AdminTablePage } from '@/components/admin/AdminTablePage';

const rows = [
  { id: 'i-001', title: 'Investor u-002 → p-001', meta: '100 IDRX', status: 'pending' },
  { id: 'i-002', title: 'Investor u-003 → p-002', meta: '250 IDRX', status: 'confirmed' },
  { id: 'i-003', title: 'Investor u-004 → p-003', meta: '50 IDRX', status: 'settled' },
];

export default function InvestmentsAdminPage() {
  return (
    <AdminTablePage
      badge="Admin • Investments"
      title="Investments"
      description="Create and review on-chain investments, plus recalc portfolios and stats for projects."
      active="investments"
      rows={rows}
    />
  );
}
