'use client';

import { useState } from 'react';
import { toast } from 'sonner';

import { useCreateFarmerMutation } from '@/modules/farmers/data/farmers.mutation';
import { useCollectorsQuery } from '@/modules/collectors/data/collectors.query';

import CrudModal from '@/components/organisms/CrudModal';
import FormField from '@/components/molecules/FormField';
import FormSelectField from '@/components/molecules/FormSelectField';
import Button from '@/components/atoms/Button';

interface CreateFarmerFlowProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess?: () => void;
}

export default function CreateFarmerFlow({ isOpen, onClose, onSuccess }: CreateFarmerFlowProps) {
    const [formData, setFormData] = useState({
        collectorId: '',
        nik: '',
        name: '',
        address: '',
    });

    const { data: collectors } = useCollectorsQuery({ page: 1, limit: 100 });
    const createFarmer = useCreateFarmerMutation();

    const collectorOptions = (collectors?.data ?? []).map((c: any) => ({ value: c.id, label: c.name }));

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await createFarmer.mutateAsync({
                collectorId: formData.collectorId,
                nik: formData.nik,
                name: formData.name,
                address: formData.address,
            });

            toast.success('Farmer created successfully!');
            setFormData({ collectorId: '', nik: '', name: '', address: '' });
            onSuccess?.();
            onClose();
        } catch (error: any) {
            console.error('Farmer creation failed:', error);
            toast.error(error.message || 'Failed to create farmer');
        }
    };

    const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData(prev => ({ ...prev, [field]: e.target.value }));
    };

    return (
        <CrudModal isOpen={isOpen} onClose={onClose} title="Create New Farmer">
            <form onSubmit={handleSubmit} className="space-y-4">
                <FormSelectField
                    label="Collector"
                    required
                    options={collectorOptions}
                    placeholder="Select Collector"
                    value={formData.collectorId}
                    onChange={handleChange('collectorId')}
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
                    <Button type="submit" isLoading={createFarmer.isPending} className="flex-1">
                        Create Farmer
                    </Button>
                </div>
            </form>
        </CrudModal>
    );
}
