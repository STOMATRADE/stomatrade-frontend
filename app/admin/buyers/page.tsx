import { AdminTablePage } from '@/components/admin/AdminTablePage';

const rows = [
  { id: 'b-001', title: 'PT Agro Makmur', meta: 'info@agromakmur.com', status: 'active' },
  { id: 'b-002', title: 'PT Nusantara Foods', meta: 'contact@nusantara.com', status: 'review' },
  { id: 'b-003', title: 'CV Beras Jaya', meta: 'sales@berasjaya.id', status: 'draft' },
];

export default function BuyersAdminPage() {
  return (
    <AdminTablePage
      badge="Admin • Buyers"
      title="Buyer companies"
      description="Manage downstream buyers, their contracts, and transaction history to keep supply traceable."
      active="buyers"
      rows={rows}
    />
  );
}
