'use client';

import { useState } from 'react';
import { toast } from 'sonner';

import { useCreateCollectorMutation } from '@/modules/collectors/data/collectors.mutation';

import CrudModal from '@/components/organisms/CrudModal';
import FormField from '@/components/molecules/FormField';
import Button from '@/components/atoms/Button';

interface CreateCollectorFlowProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess?: () => void;
}

export default function CreateCollectorFlow({ isOpen, onClose, onSuccess }: CreateCollectorFlowProps) {
    const [formData, setFormData] = useState({
        userId: '',
        nik: '',
        name: '',
        address: '',
    });

    const createCollector = useCreateCollectorMutation();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await createCollector.mutateAsync({
                userId: formData.userId,
                nik: formData.nik,
                name: formData.name,
                address: formData.address,
            });

            toast.success('Collector created successfully!');
            setFormData({ userId: '', nik: '', name: '', address: '' });
            onSuccess?.();
            onClose();
        } catch (error: any) {
            console.error('Collector creation failed:', error);
            toast.error(error.message || 'Failed to create collector');
        }
    };

    const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({ ...prev, [field]: e.target.value }));
    };

    return (
        <CrudModal isOpen={isOpen} onClose={onClose} title="Create New Collector">
            <form onSubmit={handleSubmit} className="space-y-4">
                <FormField
                    label="User ID"
                    type="text"
                    required
                    placeholder="Enter user ID"
                    value={formData.userId}
                    onChange={handleChange('userId')}
                />
                <FormField
                    label="NIK"
                    type="text"
                    required
                    placeholder="Enter NIK"
                    value={formData.nik}
                    onChange={handleChange('nik')}
                />
                <FormField
                    label="Name"
                    type="text"
                    required
                    placeholder="Enter name"
                    value={formData.name}
                    onChange={handleChange('name')}
                />
                <FormField
                    label="Address"
                    type="text"
                    required
                    placeholder="Enter address"
                    value={formData.address}
                    onChange={handleChange('address')}
                />

                <div className="flex gap-4 mt-8">
                    <Button type="button" variant="secondary" onClick={onClose} className="flex-1">
                        Cancel
                    </Button>
                    <Button type="submit" isLoading={createCollector.isPending} className="flex-1">
                        Create Collector
                    </Button>
                </div>
            </form>
        </CrudModal>
    );
}
