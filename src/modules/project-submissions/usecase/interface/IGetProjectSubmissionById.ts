import type { GetProjectSubmissionByIdRequest } from '../../domain/req/GetProjectSubmissionByIdRequest';
import type { ProjectSubmissionResponse } from '../../domain/res/ProjectSubmissionResponse';

export interface IGetProjectSubmissionById {
    execute(request: GetProjectSubmissionByIdRequest): Promise<ProjectSubmissionResponse>;
}