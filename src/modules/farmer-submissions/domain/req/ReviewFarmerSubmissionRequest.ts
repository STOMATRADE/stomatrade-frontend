export type ReviewFarmerSubmissionRequest = {
    id: string;
    status: 'approved' | 'rejected';
    notes?: string;
};