import type { GetProjectsRequest } from '../../domain/req/GetProjectsRequest';
import type { ProjectListResponse } from '../../domain/res/ProjectListResponse';
import type { IGetProjects } from '../interface/IGetProjects';
import type { ProjectRepository } from '../../repository/interface/ProjectRepository';

export class GetProjects implements IGetProjects {
    constructor(private readonly repository: ProjectRepository) {}

    async execute(request: GetProjectsRequest): Promise<ProjectListResponse> {
        if (request.page !== undefined && request.page <= 0) {
            throw new Error('page must be greater than 0');
        }
        if (request.limit !== undefined && request.limit <= 0) {
            throw new Error('limit must be greater than 0');
        }
        return this.repository.getProjects(request);
    }
}
