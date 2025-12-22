import type { CreateFarmerSubmissionRequest } from '../../domain/req/CreateFarmerSubmissionRequest';
import type { GetFarmerSubmissionsRequest } from '../../domain/req/GetFarmerSubmissionsRequest';
import type { GetFarmerSubmissionByIdRequest } from '../../domain/req/GetFarmerSubmissionByIdRequest';
import type { ReviewFarmerSubmissionRequest } from '../../domain/req/ReviewFarmerSubmissionRequest';
import type { FarmerSubmissionResponse } from '../../domain/res/FarmerSubmissionResponse';
import type { FarmerSubmissionListResponse } from '../../domain/res/FarmerSubmissionListResponse';

export interface FarmerSubmissionRepository {
    createSubmission(request: CreateFarmerSubmissionRequest): Promise<FarmerSubmissionResponse>;
    getSubmissions(request: GetFarmerSubmissionsRequest): Promise<FarmerSubmissionListResponse>;
    getSubmissionById(request: GetFarmerSubmissionByIdRequest): Promise<FarmerSubmissionResponse>;
    approveSubmission(id: string, notes?: string): Promise<FarmerSubmissionResponse>;
    rejectSubmission(id: string, notes?: string): Promise<FarmerSubmissionResponse>;
    updateSubmission(request: ReviewFarmerSubmissionRequest): Promise<FarmerSubmissionResponse>;
    deleteSubmission(id: string): Promise<void>;
}