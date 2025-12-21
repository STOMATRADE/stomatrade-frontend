import { get, post, put } from '@/core/utils/http/httpClient';
import { API_ROUTES } from '@/core/constant/api';
import type { GetProjectsRequest } from '../../domain/req/GetProjectsRequest';
import type { CreateProjectRequest } from '../../domain/req/CreateProjectRequest';
import type { UpdateProjectRequest } from '../../domain/req/UpdateProjectRequest';
import type { ProjectListResponse } from '../../domain/res/ProjectListResponse';
import type { ProjectDetailResponse } from '../../domain/res/ProjectDetailResponse';
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

    getProjectById(id: string): Promise<ProjectDetailResponse> {
        return get<ProjectDetailResponse>(API_ROUTES.projects.byId(id));
    }

    createProject(request: CreateProjectRequest): Promise<ProjectDetailResponse> {
        return post<ProjectDetailResponse>(API_ROUTES.projects.root, request);
    }

    updateProject(request: UpdateProjectRequest): Promise<ProjectDetailResponse> {
        return put<ProjectDetailResponse>(API_ROUTES.projects.byId(request.id), {
            name: request.name,
            description: request.description,
            status: request.status,
        });
    }
}
