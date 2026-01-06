'use client';

import { useState, useEffect } from 'react';
import { toast } from 'sonner';

import { useUpdateFarmerMutation } from '@/modules/farmers/data/farmers.mutation';

import CrudModal from '@/components/organisms/CrudModal';
import FormField from '@/components/molecules/FormField';
import Button from '@/components/atoms/Button';

interface FarmerData {
    id: string;
    collectorId: string;
    nik: string;
    name: string;
    address: string;
}

interface EditFarmerFlowProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess?: () => void;
    farmer: FarmerData | null;
}

export default function EditFarmerFlow({ isOpen, onClose, onSuccess, farmer }: EditFarmerFlowProps) {
    const [formData, setFormData] = useState({
        id: '',
        name: '',
        address: '',
    });

    const updateFarmer = useUpdateFarmerMutation();

    useEffect(() => {
        if (farmer) {
            setFormData({
                id: farmer.id,
                name: farmer.name,
                address: farmer.address,
            });
        }
    }, [farmer]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await updateFarmer.mutateAsync({
                id: formData.id,
                name: formData.name,
                address: formData.address,
            });

            toast.success('Farmer updated successfully!');
            onSuccess?.();
            onClose();
        } catch (error: any) {
            console.error('Farmer update failed:', error);
            toast.error(error.message || 'Failed to update farmer');
        }
    };

    const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({ ...prev, [field]: e.target.value }));
    };

    if (!farmer) return null;

    return (
        <CrudModal isOpen={isOpen} onClose={onClose} title="Edit Farmer">
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="p-3 bg-primary-container/50 rounded-xl mb-4">
                    <p className="text-sm text-text-secondary">
                        <span className="font-medium">NIK:</span> {farmer.nik}
                    </p>
                </div>

                <FormField
                    label="Name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange('name')}
                />
                <FormField
                    label="Address"
                    type="text"
                    required
                    value={formData.address}
                    onChange={handleChange('address')}
                />

                <div className="flex gap-4 mt-8">
                    <Button type="button" variant="secondary" onClick={onClose} className="flex-1">
                        Cancel
                    </Button>
                    <Button type="submit" isLoading={updateFarmer.isPending} className="flex-1">
                        Save Changes
                    </Button>
                </div>
            </form>
        </CrudModal>
    );
}
