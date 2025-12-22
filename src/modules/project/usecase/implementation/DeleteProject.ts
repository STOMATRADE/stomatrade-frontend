import type { ProjectDetailResponse } from '../../domain/res/ProjectDetailResponse';
import type { IDeleteProject } from '../interface/IDeleteProject';
import type { ProjectRepository } from '../../repository/interface/ProjectRepository';

export class DeleteProject implements IDeleteProject {
    constructor(private readonly repository: ProjectRepository) {}

    async execute(id: string): Promise<ProjectDetailResponse> {
        if (!id || id.trim().length === 0) {
            throw new Error('id is required');
        }
        return this.repository.deleteProject(id);
    }
}
