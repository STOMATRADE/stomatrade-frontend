import type { CreateProjectSubmissionRequest } from '../../domain/req/CreateProjectSubmissionRequest';
import type { ProjectSubmissionResponse } from '../../domain/res/ProjectSubmissionResponse';

export interface ICreateProjectSubmission {
    execute(request: CreateProjectSubmissionRequest): Promise<ProjectSubmissionResponse>;
}