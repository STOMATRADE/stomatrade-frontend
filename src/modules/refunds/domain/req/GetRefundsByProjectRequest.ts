export type GetRefundsByProjectRequest = {
    projectId: string;
    page?: number;
    limit?: number;
    status?: 'pending' | 'approved' | 'rejected' | 'completed';
};