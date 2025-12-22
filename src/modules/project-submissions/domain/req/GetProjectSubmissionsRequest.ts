export type GetProjectSubmissionsRequest = {
    page?: number;
    limit?: number;
    status?: 'pending' | 'approved' | 'rejected';
};