export type GetFarmerSubmissionsRequest = {
    page?: number;
    limit?: number;
    status?: 'pending' | 'approved' | 'rejected';
};