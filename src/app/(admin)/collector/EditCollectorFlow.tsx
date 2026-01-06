'use client';

import { useState, useEffect } from 'react';
import { toast } from 'sonner';

import { useUpdateCollectorMutation } from '@/modules/collectors/data/collectors.mutation';

import CrudModal from '@/components/organisms/CrudModal';
import FormField from '@/components/molecules/FormField';
import Button from '@/components/atoms/Button';

interface CollectorData {
    id: string;
    userId: string;
    nik: string;
    name: string;
    address: string;
}

interface EditCollectorFlowProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess?: () => void;
    collector: CollectorData | null;
}

export default function EditCollectorFlow({ isOpen, onClose, onSuccess, collector }: EditCollectorFlowProps) {
    const [formData, setFormData] = useState({
        id: '',
        name: '',
        address: '',
    });

    const updateCollector = useUpdateCollectorMutation();

    useEffect(() => {
        if (collector) {
            setFormData({
                id: collector.id,
                name: collector.name,
                address: collector.address,
            });
        }
    }, [collector]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await updateCollector.mutateAsync({
                id: formData.id,
                name: formData.name,
                address: formData.address,
            });

            toast.success('Collector updated successfully!');
            onSuccess?.();
            onClose();
        } catch (error: any) {
            console.error('Collector update failed:', error);
            toast.error(error.message || 'Failed to update collector');
        }
    };

    const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({ ...prev, [field]: e.target.value }));
    };

    if (!collector) return null;

    return (
        <CrudModal isOpen={isOpen} onClose={onClose} title="Edit Collector">
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="p-3 bg-primary-container/50 rounded-xl mb-4">
                    <p className="text-sm text-text-secondary">
                        <span className="font-medium">NIK:</span> {collector.nik}
                    </p>
                    <p className="text-sm text-text-secondary">
                        <span className="font-medium">User ID:</span> {collector.userId}
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
                    <Button type="submit" isLoading={updateCollector.isPending} className="flex-1">
                        Save Changes
                    </Button>
                </div>
            </form>
        </CrudModal>
    );
}
