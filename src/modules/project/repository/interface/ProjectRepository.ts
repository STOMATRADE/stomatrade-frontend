import type { GetProjectsRequest } from '../../domain/req/GetProjectsRequest';
import type { CreateProjectRequest } from '../../domain/req/CreateProjectRequest';
import type { UpdateProjectRequest } from '../../domain/req/UpdateProjectRequest';
import type { ProjectListResponse } from '../../domain/res/ProjectListResponse';
import type { ProjectDetailResponse } from '../../domain/res/ProjectDetailResponse';

export interface ProjectRepository {
    getProjects(request: GetProjectsRequest): Promise<ProjectListResponse>;
    getProjectById(id: string): Promise<ProjectDetailResponse>;
    createProject(request: CreateProjectRequest): Promise<ProjectDetailResponse>;
    updateProject(request: UpdateProjectRequest): Promise<ProjectDetailResponse>;
}
