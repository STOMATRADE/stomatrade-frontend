export type ReviewProjectSubmissionRequest = {
    id: string;
    status: 'approved' | 'rejected';
    notes?: string;
};