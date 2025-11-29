import { AdminTablePage } from '@/components/admin/AdminTablePage';

const rows = [
  { id: 'rf-001', title: 'Mark refundable p-001', meta: 'reason: target not reached', status: 'open' },
  { id: 'rf-002', title: 'Claim refund u-002 / p-002', meta: '250 IDRX', status: 'processing' },
  { id: 'rf-003', title: 'Refundable projects list', meta: 'p-003, p-004', status: 'ready' },
];

export default function RefundsAdminPage() {
  return (
    <AdminTablePage
      badge="Admin • Refunds"
      title="Refund workflows"
      description="Control refund eligibility for projects and handle investor refund claims end-to-end."
      active="refunds"
      rows={rows}
    />
  );
}
