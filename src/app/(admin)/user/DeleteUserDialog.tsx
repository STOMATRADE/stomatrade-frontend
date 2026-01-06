'use client';

import { toast } from 'sonner';
import { useDeleteUserMutation } from '@/modules/users/data/users.mutation';

import CrudModal from '@/components/organisms/CrudModal';
import Button from '@/components/atoms/Button';

interface DeleteUserDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess?: () => void;
    user: { id: string; walletAddress: string } | null;
}

export default function DeleteUserDialog({ isOpen, onClose, onSuccess, user }: DeleteUserDialogProps) {
    const deleteUser = useDeleteUserMutation();

    const handleDelete = async () => {
        if (!user) return;

        try {
            await deleteUser.mutateAsync(user.id);
            toast.success('User deleted successfully!');
            onSuccess?.();
            onClose();
        } catch (error: any) {
            console.error('User deletion failed:', error);
            toast.error(error.message || 'Failed to delete user');
        }
    };

    if (!user) return null;

    return (
        <CrudModal isOpen={isOpen} onClose={onClose} title="Delete User">
            <div className="space-y-6">
                <div className="text-center">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-500/20 mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-500">
                            <path d="M3 6h18M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                        </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-text-primary mb-2">
                        Are you sure?
                    </h3>
                    <p className="text-text-secondary text-sm">
                        You are about to delete user<br />
                        <strong className="text-text-primary font-mono text-xs break-all">{user.walletAddress}</strong>
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
                        isLoading={deleteUser.isPending}
                        className="flex-1"
                    >
                        Delete
                    </Button>
                </div>
            </div>
        </CrudModal>
    );
}
