'use client';

import { useState } from 'react';
import { toast } from 'sonner';

import { useCreateUserMutation } from '@/modules/users/data/users.mutation';

import CrudModal from '@/components/organisms/CrudModal';
import FormField from '@/components/molecules/FormField';
import FormSelectField from '@/components/molecules/FormSelectField';
import Button from '@/components/atoms/Button';

interface CreateUserFlowProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess?: () => void;
}

const roleOptions = [
    { value: 'ADMIN', label: 'Admin' },
    { value: 'INVESTOR', label: 'Investor' },
    { value: 'COLLECTOR', label: 'Collector' },
    { value: 'STAFF', label: 'Staff' },
];

export default function CreateUserFlow({ isOpen, onClose, onSuccess }: CreateUserFlowProps) {
    const [formData, setFormData] = useState({
        walletAddress: '',
        role: '',
    });

    const createUser = useCreateUserMutation();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await createUser.mutateAsync({
                walletAddress: formData.walletAddress,
                role: formData.role,
            });

            toast.success('User created successfully!');
            setFormData({ walletAddress: '', role: '' });
            onSuccess?.();
            onClose();
        } catch (error: any) {
            console.error('User creation failed:', error);
            toast.error(error.message || 'Failed to create user');
        }
    };

    const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData(prev => ({ ...prev, [field]: e.target.value }));
    };

    return (
        <CrudModal isOpen={isOpen} onClose={onClose} title="Create New User">
            <form onSubmit={handleSubmit} className="space-y-4">
                <FormField
                    label="Wallet Address"
                    type="text"
                    required
                    placeholder="0x..."
                    value={formData.walletAddress}
                    onChange={handleChange('walletAddress')}
                />
                <FormSelectField
                    label="Role"
                    required
                    options={roleOptions}
                    placeholder="Select Role"
                    value={formData.role}
                    onChange={handleChange('role')}
                />

                <div className="flex gap-4 mt-8">
                    <Button type="button" variant="secondary" onClick={onClose} className="flex-1">
                        Cancel
                    </Button>
                    <Button type="submit" isLoading={createUser.isPending} className="flex-1">
                        Create User
                    </Button>
                </div>
            </form>
        </CrudModal>
    );
}
