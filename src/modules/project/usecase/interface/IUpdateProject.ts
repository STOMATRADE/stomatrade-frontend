import type { UpdateProjectRequest } from '../../domain/req/UpdateProjectRequest';
import type { ProjectDetailResponse } from '../../domain/res/ProjectDetailResponse';

export interface IUpdateProject {
    execute(request: UpdateProjectRequest): Promise<ProjectDetailResponse>;
}
