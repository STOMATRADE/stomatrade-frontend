import type { CreateProjectRequest } from '../../domain/req/CreateProjectRequest';
import type { ProjectDetailResponse } from '../../domain/res/ProjectDetailResponse';

export interface ICreateProject {
    execute(request: CreateProjectRequest): Promise<ProjectDetailResponse>;
}
