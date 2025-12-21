import type { ProjectDetailResponse } from '../../domain/res/ProjectDetailResponse';
import type { IGetProjectById } from '../interface/IGetProjectById';
import type { ProjectRepository } from '../../repository/interface/ProjectRepository';

export class GetProjectById implements IGetProjectById {
    constructor(private readonly repository: ProjectRepository) {}

    async execute(id: string): Promise<ProjectDetailResponse> {
        if (!id || id.trim().length === 0) {
            throw new Error('id is required');
        }
        return this.repository.getProjectById(id);
    }
}
