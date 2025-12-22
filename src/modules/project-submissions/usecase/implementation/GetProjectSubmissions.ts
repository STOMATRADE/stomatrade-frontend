import type { GetProjectSubmissionsRequest } from '../../domain/req/GetProjectSubmissionsRequest';
import type { ProjectSubmissionListResponse } from '../../domain/res/ProjectSubmissionListResponse';
import type { IGetProjectSubmissions } from '../interface/IGetProjectSubmissions';
import type { ProjectSubmissionRepository } from '../../repository/interface/ProjectSubmissionRepository';

export class GetProjectSubmissions implements IGetProjectSubmissions {
    constructor(private readonly repository: ProjectSubmissionRepository) {}

    async execute(request: GetProjectSubmissionsRequest): Promise<ProjectSubmissionListResponse> {
        return this.repository.getSubmissions(request);
    }
}