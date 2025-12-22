export type RefundEntity = {
    id: string;
    userId: string;
    projectId: string;
    investmentId: string;
    amount: number;
    status: 'pending' | 'approved' | 'rejected' | 'completed';
    reason: string;
    isRefundable: boolean;
    claimedAt?: string;
    processedAt?: string;
    createdAt: string;
    updatedAt: string;
};