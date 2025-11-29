'use client';

import Link from 'next/link';
import { ReactNode, useState } from 'react';

type Row = {
  id: string;
  title: string;
  meta?: string;
  status?: string;
};

type AdminTablePageProps = {
  badge: string;
  title: string;
  description: string;
  active: string;
  rows: Row[];
  children?: ReactNode;
};

const sidebarLinks: { label: string; href: string; key: string }[] = [
  { label: 'Overview', href: '/admin', key: 'overview' },
  { label: 'Users', href: '/admin/users', key: 'users' },
  { label: 'Collectors', href: '/admin/collectors', key: 'collectors' },
  { label: 'Farmers', href: '/admin/farmers', key: 'farmers' },
  { label: 'Projects', href: '/admin/projects', key: 'projects' },
  { label: 'Buyers', href: '/admin/buyers', key: 'buyers' },
  { label: 'Investments', href: '/admin/investments', key: 'investments' },
  { label: 'Portfolios', href: '/admin/portfolios', key: 'portfolios' },
  { label: 'Profits', href: '/admin/profits', key: 'profits' },
  { label: 'Refunds', href: '/admin/refunds', key: 'refunds' },
  { label: 'Notifications', href: '/admin/notifications', key: 'notifications' },
];

export function AdminTablePage({ badge, title, description, active, rows, children }: AdminTablePageProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [activeRow, setActiveRow] = useState<Row | null>(null);

  const openCreate = () => {
    setActiveRow(null);
    setModalOpen(true);
  };

  const openEdit = (row: Row) => {
    setActiveRow(row);
    setModalOpen(true);
  };

  return (
    <div className="mx-auto flex max-w-6xl gap-6">
      <aside className="sticky top-4 h-fit w-64 space-y-2 rounded-2xl border border-[#1f1f1f] bg-secondaryBg/80 p-4 shadow-glow">
        <p className="text-xs uppercase tracking-[0.2em] text-gray-400">Admin Menu</p>
        <nav className="mt-3 space-y-1 text-sm">
          {sidebarLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center justify-between rounded-xl px-3 py-2 transition ${
                link.key === active ? 'bg-bg text-primary' : 'text-gray-200 hover:bg-bg hover:text-primary'
              }`}
            >
              <span>{link.label}</span>
              <span className="text-xs text-gray-500">↗</span>
            </Link>
          ))}
        </nav>
      </aside>

      <div className="flex-1 space-y-6">
        <div className="rounded-3xl border border-[#1f1f1f] bg-secondaryBg/80 p-6 shadow-glow">
          <p className="badge">{badge}</p>
          <h1 className="mt-3 font-abhaya-libre text-4xl text-white">{title}</h1>
          <p className="mt-2 text-gray-300">{description}</p>
          {children ? <div className="mt-4">{children}</div> : null}
        </div>

        <div className="rounded-3xl border border-[#1f1f1f] bg-secondaryBg/70 p-6 shadow-glow">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-white">Data table</p>
              <p className="text-gray-400">Mock data scaffold; wire to API when ready.</p>
            </div>
            <div className="flex gap-3">
              <button onClick={openCreate} className="btn-primary">
                Add
              </button>
              <button className="rounded-full border border-[#1f1f1f] px-4 py-2 text-sm font-semibold text-gray-200 hover:border-primary hover:text-primary">
                Refresh
              </button>
            </div>
          </div>

          <div className="mt-4 overflow-hidden rounded-2xl border border-[#1f1f1f] bg-bg/70">
            <table className="min-w-full divide-y divide-[#1f1f1f] text-sm text-gray-200">
              <thead className="bg-secondaryBg/60">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold text-gray-300">ID</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-300">Title</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-300">Meta</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-300">Status</th>
                  <th className="px-4 py-3 text-right font-semibold text-gray-300">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1f1f1f]">
                {rows.map((row) => (
                  <tr key={row.id} className="hover:bg-secondaryBg/40">
                    <td className="px-4 py-3 font-mono text-xs text-gray-400">{row.id}</td>
                    <td className="px-4 py-3 text-white">{row.title}</td>
                    <td className="px-4 py-3 text-gray-300">{row.meta || '—'}</td>
                    <td className="px-4 py-3">
                      <span className="rounded-full bg-secondaryBg px-3 py-1 text-xs font-semibold text-primary">
                        {row.status || 'n/a'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button
                        onClick={() => openEdit(row)}
                        className="rounded-full border border-[#1f1f1f] px-3 py-1 text-xs font-semibold text-gray-200 hover:border-primary hover:text-primary"
                      >
                        Update
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {modalOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
          <div className="w-full max-w-xl rounded-3xl border border-[#1f1f1f] bg-secondaryBg/90 p-6 shadow-glow">
            <div className="flex items-start justify-between">
              <div>
                <p className="badge">{activeRow ? 'Update' : 'Add'}</p>
                <h2 className="mt-2 text-xl font-semibold text-white">
                  {activeRow ? `Editing ${activeRow.title}` : 'Create new record'}
                </h2>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="rounded-full border border-[#1f1f1f] px-3 py-1 text-sm text-gray-200 hover:border-primary hover:text-primary"
              >
                Close
              </button>
            </div>
            <div className="mt-4 space-y-4">
              <div className="grid gap-3 md:grid-cols-2">
                <label className="space-y-1 text-sm text-gray-300">
                  <span>Title</span>
                  <input
                    defaultValue={activeRow?.title || ''}
                    className="w-full rounded-xl border border-[#1f1f1f] bg-bg px-3 py-2 text-gray-100 outline-none focus:border-primary"
                  />
                </label>
                <label className="space-y-1 text-sm text-gray-300">
                  <span>Status</span>
                  <input
                    defaultValue={activeRow?.status || ''}
                    className="w-full rounded-xl border border-[#1f1f1f] bg-bg px-3 py-2 text-gray-100 outline-none focus:border-primary"
                  />
                </label>
              </div>
              <label className="space-y-1 text-sm text-gray-300">
                <span>Meta</span>
                <input
                  defaultValue={activeRow?.meta || ''}
                  className="w-full rounded-xl border border-[#1f1f1f] bg-bg px-3 py-2 text-gray-100 outline-none focus:border-primary"
                />
              </label>
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setModalOpen(false)}
                className="rounded-full border border-[#1f1f1f] px-4 py-2 text-sm font-semibold text-gray-200 hover:border-primary hover:text-primary"
              >
                Cancel
              </button>
              <button className="btn-primary px-5">{activeRow ? 'Update' : 'Create'}</button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
