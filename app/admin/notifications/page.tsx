import { AdminTablePage } from '@/components/admin/AdminTablePage';

const rows = [
  { id: 'n-001', title: 'Channel: project_updates', meta: 'desc: project alerts', status: 'active' },
  { id: 'n-002', title: 'Notification: New project', meta: 'channel project_updates', status: 'sent' },
  { id: 'n-003', title: 'FCM token user u-002', meta: 'fcm_token_abc123', status: 'registered' },
];

export default function NotificationsAdminPage() {
  return (
    <AdminTablePage
      badge="Admin • Notifications"
      title="Notifications & channels"
      description="Manage channels, messages, and device tokens for project and investment updates."
      active="notifications"
      rows={rows}
    />
  );
}
