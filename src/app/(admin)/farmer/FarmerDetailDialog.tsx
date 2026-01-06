'use client';

import CrudModal from '@/components/organisms/CrudModal';
import type { FarmerEntity } from '@/modules/farmers/domain/entity/FarmerEntity';

interface FarmerDetailDialogProps {
    isOpen: boolean;
    onClose: () => void;
    farmer: FarmerEntity | null;
}

export default function FarmerDetailDialog({ isOpen, onClose, farmer }: FarmerDetailDialogProps) {
    if (!farmer) return null;

    const details = [
        { label: 'Farmer ID', value: farmer.id },
        { label: 'Collector ID', value: farmer.collectorId },
        { label: 'NIK', value: farmer.nik },
        { label: 'Name', value: farmer.name },
        { label: 'Address', value: farmer.address },
        { label: 'Status', value: farmer.deleted ? 'Inactive (Deleted)' : 'Active' },
        { label: 'Created At', value: new Date(farmer.createdAt).toLocaleString() },
        { label: 'Last Updated', value: new Date(farmer.updatedAt).toLocaleString() },
    ];

    return (
        <CrudModal
            isOpen={isOpen}
            onClose={onClose}
            title="Farmer Details"
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
