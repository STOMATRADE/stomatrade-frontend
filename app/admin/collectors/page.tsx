import { AdminTablePage } from '@/components/admin/AdminTablePage';

const rows = [
  { id: 'c-001', title: 'John Doe', meta: 'user u-003', status: 'verified' },
  { id: 'c-002', title: 'Jane Smith', meta: 'user u-004', status: 'draft' },
  { id: 'c-003', title: 'Adi Santoso', meta: 'user u-005', status: 'pending' },
];

export default function CollectorsAdminPage() {
  return (
    <AdminTablePage
      badge="Admin • Collectors"
      title="Collector management"
      description="Onboard collector leaders, maintain their identity and address data, and control lifecycle actions."
      active="collectors"
      rows={rows}
    />
  );
}
