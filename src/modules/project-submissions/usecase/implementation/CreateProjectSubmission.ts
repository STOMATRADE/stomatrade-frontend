import type { CreateProjectSubmissionRequest } from '../../domain/req/CreateProjectSubmissionRequest';
import type { ProjectSubmissionResponse } from '../../domain/res/ProjectSubmissionResponse';
import type { ICreateProjectSubmission } from '../interface/ICreateProjectSubmission';
import type { ProjectSubmissionRepository } from '../../repository/interface/ProjectSubmissionRepository';
import { ApiError } from '@/core/utils/http/httpClient';

export class CreateProjectSubmission implements ICreateProjectSubmission {
    constructor(private readonly repository: ProjectSubmissionRepository) {}

    async execute(request: CreateProjectSubmissionRequest): Promise<ProjectSubmissionResponse> {
        if (!request.projectId || request.projectId.trim().length === 0) {
            throw new ApiError(400, 'projectId is required');
        }
        if (!request.documentUrl || request.documentUrl.trim().length === 0) {
            throw new ApiError(400, 'documentUrl is required');
        }
        
        return this.repository.createSubmission(request);
    }
}