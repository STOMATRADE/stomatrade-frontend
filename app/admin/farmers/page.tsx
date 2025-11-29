import { AdminTablePage } from '@/components/admin/AdminTablePage';

const rows = [
  { id: 'f-001', title: 'Farmer A', meta: 'collector c-001', status: 'active' },
  { id: 'f-002', title: 'Farmer B', meta: 'collector c-002', status: 'review' },
  { id: 'f-003', title: 'Farmer C', meta: 'collector c-002', status: 'draft' },
];

export default function FarmersAdminPage() {
  return (
    <AdminTablePage
      badge="Admin • Farmers"
      title="Farmer management"
      description="Create, list, update, and retire farmers linked to collectors with full traceability and verification."
      active="farmers"
      rows={rows}
    />
  );
}
