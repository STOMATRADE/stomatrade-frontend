import type { GetProjectSubmissionByIdRequest } from '../../domain/req/GetProjectSubmissionByIdRequest';
import type { ProjectSubmissionResponse } from '../../domain/res/ProjectSubmissionResponse';
import type { IGetProjectSubmissionById } from '../interface/IGetProjectSubmissionById';
import type { ProjectSubmissionRepository } from '../../repository/interface/ProjectSubmissionRepository';

export class GetProjectSubmissionById implements IGetProjectSubmissionById {
    constructor(private readonly repository: ProjectSubmissionRepository) {}

    async execute(request: GetProjectSubmissionByIdRequest): Promise<ProjectSubmissionResponse> {
        return this.repository.getSubmissionById(request);
    }
}