import type { ProjectDetailInfoResponse } from '../../domain/res/ProjectDetailInfoResponse';
import type { IGetProjectDetail } from '../interface/IGetProjectDetail';
import type { ProjectRepository } from '../../repository/interface/ProjectRepository';

export class GetProjectDetail implements IGetProjectDetail {
    constructor(private readonly repository: ProjectRepository) {}

    async execute(id: string): Promise<ProjectDetailInfoResponse> {
        if (!id || id.trim().length === 0) {
            throw new Error('id is required');
        }
        return this.repository.getProjectDetail(id);
    }
}
