import type { GetProjectsRequest } from '../../domain/req/GetProjectsRequest';
import type { GetProjectsByFarmerRequest } from '../../domain/req/GetProjectsByFarmerRequest';
import type { GetProjectsByLandRequest } from '../../domain/req/GetProjectsByLandRequest';
import type { CreateProjectRequest } from '../../domain/req/CreateProjectRequest';
import type { UpdateProjectRequest } from '../../domain/req/UpdateProjectRequest';
import type { ProjectListResponse } from '../../domain/res/ProjectListResponse';
import type { ProjectDetailResponse } from '../../domain/res/ProjectDetailResponse';
import type { ProjectDetailInfoResponse } from '../../domain/res/ProjectDetailInfoResponse';

export interface ProjectRepository {
    getProjects(request: GetProjectsRequest): Promise<ProjectListResponse>;
    getOngoingProjects(request: GetProjectsRequest): Promise<ProjectListResponse>;
    getProjectsByFarmer(request: GetProjectsByFarmerRequest): Promise<ProjectListResponse>;
    getProjectsByLand(request: GetProjectsByLandRequest): Promise<ProjectListResponse>;
    getProjectById(id: string): Promise<ProjectDetailResponse>;
    getProjectDetail(id: string): Promise<ProjectDetailInfoResponse>;
    createProject(request: CreateProjectRequest): Promise<ProjectDetailResponse>;
    updateProject(request: UpdateProjectRequest): Promise<ProjectDetailResponse>;
    deleteProject(id: string): Promise<ProjectDetailResponse>;
}
