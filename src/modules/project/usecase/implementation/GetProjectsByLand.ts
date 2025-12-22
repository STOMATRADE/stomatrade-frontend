import type { GetProjectsByLandRequest } from '../../domain/req/GetProjectsByLandRequest';
import type { ProjectListResponse } from '../../domain/res/ProjectListResponse';
import type { IGetProjectsByLand } from '../interface/IGetProjectsByLand';
import type { ProjectRepository } from '../../repository/interface/ProjectRepository';

export class GetProjectsByLand implements IGetProjectsByLand {
    constructor(private readonly repository: ProjectRepository) {}

    async execute(request: GetProjectsByLandRequest): Promise<ProjectListResponse> {
        if (!request.landId || request.landId.trim().length === 0) {
            throw new Error('landId is required');
        }
        if (request.page !== undefined && request.page <= 0) {
            throw new Error('page must be greater than 0');
        }
        if (request.limit !== undefined && request.limit <= 0) {
            throw new Error('limit must be greater than 0');
        }
        return this.repository.getProjectsByLand(request);
    }
}
