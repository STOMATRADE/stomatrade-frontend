import { get, post, patch, del } from '@/core/utils/http/httpClient';
import { API_ROUTES } from '@/core/constant/api';
import type { GetProjectsRequest } from '../../domain/req/GetProjectsRequest';
import type { GetProjectsByFarmerRequest } from '../../domain/req/GetProjectsByFarmerRequest';
import type { GetProjectsByLandRequest } from '../../domain/req/GetProjectsByLandRequest';
import type { CreateProjectRequest } from '../../domain/req/CreateProjectRequest';
import type { UpdateProjectRequest } from '../../domain/req/UpdateProjectRequest';
import type { ProjectListResponse } from '../../domain/res/ProjectListResponse';
import type { ProjectDetailResponse } from '../../domain/res/ProjectDetailResponse';
import type { ProjectDetailInfoResponse } from '../../domain/res/ProjectDetailInfoResponse';
import type { ProjectRepository } from '../interface/ProjectRepository';

export class ProjectRepositoryImpl implements ProjectRepository {
    getProjects(request: GetProjectsRequest): Promise<ProjectListResponse> {
        const params = new URLSearchParams();
        if (request.page !== undefined) params.set('page', String(request.page));
        if (request.limit !== undefined) params.set('limit', String(request.limit));
        const base = API_ROUTES.projects.root;
        const endpoint = params.toString() ? `${base}?${params.toString()}` : base;

        return get<ProjectListResponse>(endpoint);
    }

    getOngoingProjects(request: GetProjectsRequest): Promise<ProjectListResponse> {
        const params = new URLSearchParams();
        if (request.page !== undefined) params.set('page', String(request.page));
        if (request.limit !== undefined) params.set('limit', String(request.limit));
        const base = API_ROUTES.projects.ongoing;
        const endpoint = params.toString() ? `${base}?${params.toString()}` : base;

        return get<ProjectListResponse>(endpoint);
    }

    getProjectsByFarmer(request: GetProjectsByFarmerRequest): Promise<ProjectListResponse> {
        const params = new URLSearchParams();
        if (request.page !== undefined) params.set('page', String(request.page));
        if (request.limit !== undefined) params.set('limit', String(request.limit));
        const base = API_ROUTES.projects.byFarmer(request.farmerId);
        const endpoint = params.toString() ? `${base}?${params.toString()}` : base;

        return get<ProjectListResponse>(endpoint);
    }

    getProjectsByLand(request: GetProjectsByLandRequest): Promise<ProjectListResponse> {
        const params = new URLSearchParams();
        if (request.page !== undefined) params.set('page', String(request.page));
        if (request.limit !== undefined) params.set('limit', String(request.limit));
        const base = API_ROUTES.projects.byLand(request.landId);
        const endpoint = params.toString() ? `${base}?${params.toString()}` : base;

        return get<ProjectListResponse>(endpoint);
    }

    getProjectById(id: string): Promise<ProjectDetailResponse> {
        return get<ProjectDetailResponse>(API_ROUTES.projects.byId(id));
    }

    getProjectDetail(id: string): Promise<ProjectDetailInfoResponse> {
        return get<ProjectDetailInfoResponse>(API_ROUTES.projects.detail(id));
    }

    createProject(request: CreateProjectRequest): Promise<ProjectDetailResponse> {
        return post<ProjectDetailResponse>(API_ROUTES.projects.root, request);
    }

    updateProject(request: UpdateProjectRequest): Promise<ProjectDetailResponse> {
        return patch<ProjectDetailResponse>(API_ROUTES.projects.byId(request.id), {
            name: request.name,
            description: request.description,
            status: request.status,
        });
    }

    deleteProject(id: string): Promise<ProjectDetailResponse> {
        return del<ProjectDetailResponse>(API_ROUTES.projects.byId(id));
    }
}
