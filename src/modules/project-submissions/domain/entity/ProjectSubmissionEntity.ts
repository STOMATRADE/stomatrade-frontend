export type ProjectSubmissionEntity = {
    id: string;
    projectId: string;
    documentUrl: string;
    status: 'pending' | 'approved' | 'rejected';
    submittedAt: string;
    reviewedAt?: string;
    reviewedBy?: string;
    notes?: string;
    createdAt: string;
    updatedAt: string;
};