export type GetRefundsByUserRequest = {
    userId: string;
    page?: number;
    limit?: number;
    status?: 'pending' | 'approved' | 'rejected' | 'completed';
};