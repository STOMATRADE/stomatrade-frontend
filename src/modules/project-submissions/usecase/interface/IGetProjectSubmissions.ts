import type { GetProjectSubmissionsRequest } from '../../domain/req/GetProjectSubmissionsRequest';
import type { ProjectSubmissionListResponse } from '../../domain/res/ProjectSubmissionListResponse';

export interface IGetProjectSubmissions {
    execute(request: GetProjectSubmissionsRequest): Promise<ProjectSubmissionListResponse>;
}