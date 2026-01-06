import type { UpdateProjectRequest } from '../../domain/req/UpdateProjectRequest';
import type { ProjectDetailResponse } from '../../domain/res/ProjectDetailResponse';
import type { IUpdateProject } from '../interface/IUpdateProject';
import type { ProjectRepository } from '../../repository/interface/ProjectRepository';

export class UpdateProject implements IUpdateProject {
    constructor(private readonly repository: ProjectRepository) { }

    async execute(request: UpdateProjectRequest): Promise<ProjectDetailResponse> {
        if (!request.id || request.id.trim().length === 0) {
            throw new Error('id is required');
        }
        // At least one field must be provided for update
        const hasUpdateField =
            request.name !== undefined ||
            request.tokenId !== undefined ||
            request.status !== undefined ||
            request.collectorId !== undefined ||
            request.farmerId !== undefined ||
            request.landId !== undefined;

        if (!hasUpdateField) {
            throw new Error('at least one field must be provided');
        }
        return this.repository.updateProject(request);
    }
}

