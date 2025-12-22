export type FarmerSubmissionEntity = {
    id: string;
    farmerId: string;
    documentUrl: string;
    status: 'pending' | 'approved' | 'rejected';
    submittedAt: string;
    reviewedAt?: string;
    reviewedBy?: string;
    notes?: string;
    createdAt: string;
    updatedAt: string;
};