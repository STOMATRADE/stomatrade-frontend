import type { CreateProjectSubmissionRequest } from '../../domain/req/CreateProjectSubmissionRequest';
import type { GetProjectSubmissionsRequest } from '../../domain/req/GetProjectSubmissionsRequest';
import type { GetProjectSubmissionByIdRequest } from '../../domain/req/GetProjectSubmissionByIdRequest';
import type { ReviewProjectSubmissionRequest } from '../../domain/req/ReviewProjectSubmissionRequest';
import type { ProjectSubmissionResponse } from '../../domain/res/ProjectSubmissionResponse';
import type { ProjectSubmissionListResponse } from '../../domain/res/ProjectSubmissionListResponse';

export interface ProjectSubmissionRepository {
    createSubmission(request: CreateProjectSubmissionRequest): Promise<ProjectSubmissionResponse>;
    getSubmissions(request: GetProjectSubmissionsRequest): Promise<ProjectSubmissionListResponse>;
    getSubmissionById(request: GetProjectSubmissionByIdRequest): Promise<ProjectSubmissionResponse>;
    approveSubmission(id: string, notes?: string): Promise<ProjectSubmissionResponse>;
    rejectSubmission(id: string, notes?: string): Promise<ProjectSubmissionResponse>;
    updateSubmission(request: ReviewProjectSubmissionRequest): Promise<ProjectSubmissionResponse>;
    deleteSubmission(id: string): Promise<void>;
}