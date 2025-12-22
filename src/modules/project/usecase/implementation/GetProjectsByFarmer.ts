import type { GetProjectsByFarmerRequest } from '../../domain/req/GetProjectsByFarmerRequest';
import type { ProjectListResponse } from '../../domain/res/ProjectListResponse';
import type { IGetProjectsByFarmer } from '../interface/IGetProjectsByFarmer';
import type { ProjectRepository } from '../../repository/interface/ProjectRepository';

export class GetProjectsByFarmer implements IGetProjectsByFarmer {
    constructor(private readonly repository: ProjectRepository) {}

    async execute(request: GetProjectsByFarmerRequest): Promise<ProjectListResponse> {
        if (!request.farmerId || request.farmerId.trim().length === 0) {
            throw new Error('farmerId is required');
        }
        if (request.page !== undefined && request.page <= 0) {
            throw new Error('page must be greater than 0');
        }
        if (request.limit !== undefined && request.limit <= 0) {
            throw new Error('limit must be greater than 0');
        }
        return this.repository.getProjectsByFarmer(request);
    }
}
