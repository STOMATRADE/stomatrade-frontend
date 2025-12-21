import type { CreateProjectRequest } from '../../domain/req/CreateProjectRequest';
import type { ProjectDetailResponse } from '../../domain/res/ProjectDetailResponse';
import type { ICreateProject } from '../interface/ICreateProject';
import type { ProjectRepository } from '../../repository/interface/ProjectRepository';

export class CreateProject implements ICreateProject {
    constructor(private readonly repository: ProjectRepository) {}

    async execute(request: CreateProjectRequest): Promise<ProjectDetailResponse> {
        if (!request.name || request.name.trim().length === 0) {
            throw new Error('name is required');
        }
        if (request.expectedReturn === undefined || Number.isNaN(request.expectedReturn)) {
            throw new Error('expectedReturn is required');
        }
        return this.repository.createProject(request);
    }
}
