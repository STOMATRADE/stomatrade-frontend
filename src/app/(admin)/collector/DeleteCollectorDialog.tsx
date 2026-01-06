'use client';

import { toast } from 'sonner';
import { useDeleteCollectorMutation } from '@/modules/collectors/data/collectors.mutation';

import CrudModal from '@/components/organisms/CrudModal';
import Button from '@/components/atoms/Button';

interface DeleteCollectorDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess?: () => void;
    collector: { id: string; name: string } | null;
}

export default function DeleteCollectorDialog({ isOpen, onClose, onSuccess, collector }: DeleteCollectorDialogProps) {
    const deleteCollector = useDeleteCollectorMutation();

    const handleDelete = async () => {
        if (!collector) return;

        try {
            await deleteCollector.mutateAsync(collector.id);
            toast.success('Collector deleted successfully!');
            onSuccess?.();
            onClose();
        } catch (error: any) {
            console.error('Collector deletion failed:', error);
            toast.error(error.message || 'Failed to delete collector');
        }
    };

    if (!collector) return null;

    return (
        <CrudModal isOpen={isOpen} onClose={onClose} title="Delete Collector">
            <div className="space-y-6">
                <div className="text-center">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-500/20 mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-500">
                            <path d="M3 6h18M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
                        </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-text-primary mb-2">
                        Are you sure?
                    </h3>
                    <p className="text-text-secondary">
                        You are about to delete collector <strong className="text-text-primary">&quot;{collector.name}&quot;</strong>. 
                        This action cannot be undone.
                    </p>
                </div>

                <div className="flex gap-4">
                    <Button type="button" variant="secondary" onClick={onClose} className="flex-1">
                        Cancel
                    </Button>
                    <Button 
                        type="button" 
                        variant="danger" 
                        onClick={handleDelete}
                        isLoading={deleteCollector.isPending} 
                        className="flex-1"
                    >
                        Delete
                    </Button>
                </div>
            </div>
        </CrudModal>
    );
}
