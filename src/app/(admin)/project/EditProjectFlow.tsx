'use client';

import { useState, useEffect } from 'react';
import { toast } from 'sonner';

import { useUpdateProjectMutation } from '@/modules/project/data/project.mutation';
import { useCollectorsQuery } from '@/modules/collectors/data/collectors.query';
import { useFarmersQuery } from '@/modules/farmers/data/farmers.query';
import { useLandsQuery } from '@/modules/lands/data/lands.query';

import CrudModal from '@/components/organisms/CrudModal';
import FormField from '@/components/molecules/FormField';
import FormSelectField from '@/components/molecules/FormSelectField';
import Button from '@/components/atoms/Button';

interface ProjectData {
    id: string;
    name: string;
    commodity: string;
    volume: number;
    sendDate: string;
    collectorId: string;
    farmerId: string;
    landId: string;
    status: string;
}

interface EditProjectFlowProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess?: () => void;
    project: ProjectData | null;
}

export default function EditProjectFlow({ isOpen, onClose, onSuccess, project }: EditProjectFlowProps) {
    const [formData, setFormData] = useState<ProjectData>({
        id: '',
        name: '',
        commodity: '',
        volume: 0,
        sendDate: '',
        collectorId: '',
        farmerId: '',
        landId: '',
        status: '',
    });

    const { data: collectors } = useCollectorsQuery({ page: 1, limit: 100 });
    const { data: farmers } = useFarmersQuery({ page: 1, limit: 100 });
    const { data: lands } = useLandsQuery({ page: 1, limit: 100 });

    const updateProject = useUpdateProjectMutation();

    // Populate form when project changes
    useEffect(() => {
        if (project) {
            setFormData({
                id: project.id,
                name: project.name,
                commodity: project.commodity,
                volume: project.volume,
                sendDate: project.sendDate?.split('T')[0] || '',
                collectorId: project.collectorId,
                farmerId: project.farmerId,
                landId: project.landId,
                status: project.status,
            });
        }
    }, [project]);

    // Convert data to select options with defensive checks
    const collectorData = Array.isArray(collectors?.data) ? collectors?.data ?? [] : [];
    const farmerData = Array.isArray(farmers?.data) ? farmers?.data ?? [] : [];
    const landData = Array.isArray(lands?.data) ? lands?.data ?? [] : [];

    const collectorOptions = collectorData.map((c: any) => ({ value: c.id, label: c.name }));
    const farmerOptions = farmerData.map((f: any) => ({ value: f.id, label: f.name }));
    const landOptions = landData.map((l: any) => ({ value: l.id, label: l.address }));

    const statusOptions = [
        { value: 'ACTIVE', label: 'Active' },
        { value: 'COMPLETED', label: 'Completed' },
        { value: 'CANCELLED', label: 'Cancelled' },
    ];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await updateProject.mutateAsync({
                id: formData.id,
                name: formData.name,
                commodity: formData.commodity,
                volume: formData.volume,
                sendDate: formData.sendDate,
                collectorId: formData.collectorId,
                farmerId: formData.farmerId,
                landId: formData.landId,
                status: formData.status as any,
            });

            toast.success('Project updated successfully!');
            onSuccess?.();
            onClose();
        } catch (error: any) {
            console.error('Project update failed:', error);
            toast.error(error.message || 'Failed to update project');
        }
    };

    const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const value = e.target.type === 'number' ? Number(e.target.value) : e.target.value;
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    if (!project) return null;

    return (
        <CrudModal isOpen={isOpen} onClose={onClose} title="Edit Project">
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                        label="Project Name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleChange('name')}
                    />
                    <FormField
                        label="Commodity"
                        type="text"
                        required
                        value={formData.commodity}
                        onChange={handleChange('commodity')}
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                        label="Volume (kg)"
                        type="number"
                        required
                        value={formData.volume}
                        onChange={handleChange('volume')}
                    />
                    <FormField
                        label="Send Date"
                        type="date"
                        required
                        value={formData.sendDate}
                        onChange={handleChange('sendDate')}
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormSelectField
                        label="Collector"
                        required
                        options={collectorOptions}
                        placeholder="Select Collector"
                        value={formData.collectorId}
                        onChange={handleChange('collectorId')}
                    />
                    <FormSelectField
                        label="Farmer"
                        required
                        options={farmerOptions}
                        placeholder="Select Farmer"
                        value={formData.farmerId}
                        onChange={handleChange('farmerId')}
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormSelectField
                        label="Land"
                        required
                        options={landOptions}
                        placeholder="Select Land"
                        value={formData.landId}
                        onChange={handleChange('landId')}
                    />
                    <FormSelectField
                        label="Status"
                        required
                        options={statusOptions}
                        value={formData.status}
                        onChange={handleChange('status')}
                    />
                </div>

                <div className="flex gap-4 mt-8">
                    <Button type="button" variant="secondary" onClick={onClose} className="flex-1">
                        Cancel
                    </Button>
                    <Button type="submit" isLoading={updateProject.isPending} className="flex-1">
                        Save Changes
                    </Button>
                </div>
            </form>
        </CrudModal>
    );
}
