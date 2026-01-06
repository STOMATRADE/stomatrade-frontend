'use client';

import CrudModal from '@/components/organisms/CrudModal';
import type { UserEntity } from '@/modules/users/domain/entity/UserEntity';

interface UserDetailDialogProps {
    isOpen: boolean;
    onClose: () => void;
    user: UserEntity | null;
}

export default function UserDetailDialog({ isOpen, onClose, user }: UserDetailDialogProps) {
    if (!user) return null;

    const details = [
        { label: 'User ID', value: user.id },
        { label: 'Wallet Address', value: user.walletAddress },
        { label: 'Role', value: user.role },
        { label: 'Status', value: user.deleted ? 'Inactive (Deleted)' : 'Active' },
        { label: 'Created At', value: new Date(user.createdAt).toLocaleString() },
        { label: 'Last Updated', value: new Date(user.updatedAt).toLocaleString() },
    ];

    return (
        <CrudModal
            isOpen={isOpen}
            onClose={onClose}
            title="User Details"
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
