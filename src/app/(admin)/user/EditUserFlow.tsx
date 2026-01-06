'use client';

import { useState, useEffect } from 'react';
import { toast } from 'sonner';

import { useUpdateUserMutation } from '@/modules/users/data/users.mutation';

import CrudModal from '@/components/organisms/CrudModal';
import FormSelectField from '@/components/molecules/FormSelectField';
import Button from '@/components/atoms/Button';

interface UserData {
    id: string;
    walletAddress: string;
    role: string;
}

interface EditUserFlowProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess?: () => void;
    user: UserData | null;
}

const roleOptions = [
    { value: 'ADMIN', label: 'Admin' },
    { value: 'INVESTOR', label: 'Investor' },
    { value: 'COLLECTOR', label: 'Collector' },
    { value: 'STAFF', label: 'Staff' },
];

export default function EditUserFlow({ isOpen, onClose, onSuccess, user }: EditUserFlowProps) {
    const [formData, setFormData] = useState({
        id: '',
        role: '',
    });

    const updateUser = useUpdateUserMutation();

    useEffect(() => {
        if (user) {
            setFormData({
                id: user.id,
                role: user.role,
            });
        }
    }, [user]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await updateUser.mutateAsync({
                id: formData.id,
                role: formData.role,
            });

            toast.success('User updated successfully!');
            onSuccess?.();
            onClose();
        } catch (error: any) {
            console.error('User update failed:', error);
            toast.error(error.message || 'Failed to update user');
        }
    };

    const handleChange = (field: string) => (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFormData(prev => ({ ...prev, [field]: e.target.value }));
    };

    if (!user) return null;

    return (
        <CrudModal isOpen={isOpen} onClose={onClose} title="Edit User">
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="p-3 bg-primary-container/50 rounded-xl mb-4">
                    <p className="text-sm text-text-secondary font-mono break-all">
                        <span className="font-medium">Wallet:</span> {user.walletAddress}
                    </p>
                </div>

                <FormSelectField
                    label="Role"
                    required
                    options={roleOptions}
                    value={formData.role}
                    onChange={handleChange('role')}
                />

                <div className="flex gap-4 mt-8">
                    <Button type="button" variant="secondary" onClick={onClose} className="flex-1">
                        Cancel
                    </Button>
                    <Button type="submit" isLoading={updateUser.isPending} className="flex-1">
                        Save Changes
                    </Button>
                </div>
            </form>
        </CrudModal>
    );
}
