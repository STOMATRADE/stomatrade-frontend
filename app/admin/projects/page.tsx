import { AdminTablePage } from '@/components/admin/AdminTablePage';

const rows = [
  { id: 'p-001', title: 'Coffee Q1 Harvest', meta: 'collector c-001', status: 'submitted' },
  { id: 'p-002', title: 'Rice Batch 12', meta: 'collector c-002', status: 'approved' },
  { id: 'p-003', title: 'Cocoa Pilot', meta: 'collector c-003', status: 'draft' },
];

export default function ProjectsAdminPage() {
  return (
    <AdminTablePage
      badge="Admin • Projects"
      title="Projects & submissions"
      description="Manage agricultural projects, their tokenization submissions, and farmer NFT approvals."
      active="projects"
      rows={rows}
    />
  );
}
