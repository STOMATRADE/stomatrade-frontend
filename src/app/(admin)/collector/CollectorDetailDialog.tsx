'use client';

import CrudModal from '@/components/organisms/CrudModal';
import type { CollectorEntity } from '@/modules/collectors/domain/entity/CollectorEntity';

interface CollectorDetailDialogProps {
    isOpen: boolean;
    onClose: () => void;
    collector: CollectorEntity | null;
}

export default function CollectorDetailDialog({ isOpen, onClose, collector }: CollectorDetailDialogProps) {
    if (!collector) return null;

    const details = [
        { label: 'Collector ID', value: collector.id },
        { label: 'User ID', value: collector.userId },
        { label: 'NIK', value: collector.nik },
        { label: 'Name', value: collector.name },
        { label: 'Address', value: collector.address },
        { label: 'Status', value: collector.deleted ? 'Inactive (Deleted)' : 'Active' },
        { label: 'Created At', value: new Date(collector.createdAt).toLocaleString() },
        { label: 'Last Updated', value: new Date(collector.updatedAt).toLocaleString() },
    ];

    return (
        <CrudModal
            isOpen={isOpen}
            onClose={onClose}
            title="Collector Details"
        >
            <div className="space-y-6">
                <div className="grid grid-cols-1 gap-y-4">
                    {details.map((detail, index) => (
                        <div key={index} className="flex flex-col gap-1 border-b border-[#dedede05] pb-3 last:border-0">
                            <span className="text-xs font-semibold uppercase tracking-wider text-text-placeholder">
                                {detail.label}
                            </span>
                            <span className="text-sm font-medium text-text-primary break-all">
                                {detail.value}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </CrudModal>
    );
}
