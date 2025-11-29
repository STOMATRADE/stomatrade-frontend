import { AdminTablePage } from '@/components/admin/AdminTablePage';

const rows = [
  { id: 'u-001', title: '0x742d...f44E', meta: 'ADMIN', status: 'active' },
  { id: 'u-002', title: '0x1234...89ab', meta: 'STAFF', status: 'active' },
  { id: 'u-003', title: '0x9876...4321', meta: 'INVESTOR', status: 'pending' },
];

export default function UsersAdminPage() {
  return (
    <AdminTablePage
      badge="Admin • Users"
      title="Users & authentication"
      description="Control wallet-based onboarding, roles, and identity lifecycle for StoMaTrade participants."
      active="users"
      rows={rows}
    />
  );
}
