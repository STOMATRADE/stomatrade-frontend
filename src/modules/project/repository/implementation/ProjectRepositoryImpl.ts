import { get, post, patch, del } from '@/core/utils/http/httpClient';
import { API_ROUTES } from '@/core/constant/api';
import type { ProjectStatus, ProjectEntity } from '../../domain/entity/ProjectEntity';
import type { GetProjectsRequest } from '../../domain/req/GetProjectsRequest';
import type { GetProjectsByFarmerRequest } from '../../domain/req/GetProjectsByFarmerRequest';
import type { GetProjectsByLandRequest } from '../../domain/req/GetProjectsByLandRequest';
import type { CreateProjectRequest } from '../../domain/req/CreateProjectRequest';
import type { UpdateProjectRequest } from '../../domain/req/UpdateProjectRequest';
import type { ProjectListResponse } from '../../domain/res/ProjectListResponse';
import type { ProjectDetailResponse } from '../../domain/res/ProjectDetailResponse';
import type { ProjectDetailInfoResponse } from '../../domain/res/ProjectDetailInfoResponse';
import type { ProjectRepository } from '../interface/ProjectRepository';

interface ApiResponse<T> {
    header: {
        statusCode: number;
        message: string;
        timestamp: string;
    };
    data: T;
}

export class ProjectRepositoryImpl implements ProjectRepository {
    private mapToEntity(project: any): ProjectEntity {
        return {
            id: project.id || '',
            name: project.name || project.projectName || '',
            description: project.description || '',
            status: (project.status as ProjectStatus) || 'ACTIVE',
            totalInvestment: Number(project.totalInvestment || project.totalFunding || 0),
            expectedReturn: Number(project.expectedReturn || project.profitShare || project.margin || 0),
            createdAt: project.createdAt || new Date().toISOString(),
        };
    }

    private mapToPaginatedResponse(response: ApiResponse<any>): ProjectListResponse {
        const data = response.data;
        const items = Array.isArray(data.items) ? data.items : [];
        const meta = data.meta || { total: 0, page: 1, limit: 10, totalPages: 1 };

        return {
            items: items.map((item: any) => this.mapToEntity(item)),
            meta: {
                total: meta.total,
                page: meta.page,
                limit: meta.limit,
                totalPages: meta.totalPages,
            },
        };
    }

    async getProjects(request: GetProjectsRequest): Promise<ProjectListResponse> {
        const params = new URLSearchParams();
        if (request.page !== undefined) params.set('page', String(request.page));
        if (request.limit !== undefined) params.set('limit', String(request.limit));
        const base = API_ROUTES.projects.root;
        const endpoint = params.toString() ? `${base}?${params.toString()}` : base;

        const response = await get<ApiResponse<any>>(endpoint);
        return this.mapToPaginatedResponse(response);
    }

    async getOngoingProjects(request: GetProjectsRequest): Promise<ProjectListResponse> {
        const params = new URLSearchParams();
        if (request.page !== undefined) params.set('page', String(request.page));
        if (request.limit !== undefined) params.set('limit', String(request.limit));
        const base = API_ROUTES.projects.ongoing;
        const endpoint = params.toString() ? `${base}?${params.toString()}` : base;

        const response = await get<ApiResponse<any>>(endpoint);
        return this.mapToPaginatedResponse(response);
    }

    async getProjectsByFarmer(request: GetProjectsByFarmerRequest): Promise<ProjectListResponse> {
        const params = new URLSearchParams();
        if (request.page !== undefined) params.set('page', String(request.page));
        if (request.limit !== undefined) params.set('limit', String(request.limit));
        const base = API_ROUTES.projects.byFarmer(request.farmerId);
        const endpoint = params.toString() ? `${base}?${params.toString()}` : base;

        const response = await get<ApiResponse<any>>(endpoint);
        return this.mapToPaginatedResponse(response);
    }

    async getProjectsByLand(request: GetProjectsByLandRequest): Promise<ProjectListResponse> {
        const params = new URLSearchParams();
        if (request.page !== undefined) params.set('page', String(request.page));
        if (request.limit !== undefined) params.set('limit', String(request.limit));
        const base = API_ROUTES.projects.byLand(request.landId);
        const endpoint = params.toString() ? `${base}?${params.toString()}` : base;

        const response = await get<ApiResponse<any>>(endpoint);
        return this.mapToPaginatedResponse(response);
    }

    async getProjectById(id: string): Promise<ProjectDetailResponse> {
        const response = await get<ApiResponse<any>>(API_ROUTES.projects.byId(id));
        return {
            project: this.mapToEntity(response.data),
        };
    }

    async getProjectDetail(id: string): Promise<ProjectDetailInfoResponse> {
        const response = await get<ApiResponse<any>>(API_ROUTES.projects.detail(id));
        const data = response.data;
        return {
            project: this.mapToEntity(data),
            ...data,
        };
    }

    async createProject(request: CreateProjectRequest): Promise<ProjectDetailResponse> {
        const response = await post<ApiResponse<any>>(API_ROUTES.projects.root, request);
        return {
            project: this.mapToEntity(response.data),
        };
    }

    async updateProject(request: UpdateProjectRequest): Promise<ProjectDetailResponse> {
        const { id, ...updateData } = request;
        if (updateData.sendDate) {
            updateData.sendDate = new Date(updateData.sendDate).toISOString();
        }
        const response = await patch<ApiResponse<any>>(API_ROUTES.projects.byId(id), updateData);
        return {
            project: this.mapToEntity(response.data),
        };
    }

    async deleteProject(id: string): Promise<ProjectDetailResponse> {
        const response = await del<ApiResponse<any>>(API_ROUTES.projects.byId(id));
        return {
            project: this.mapToEntity(response.data),
        };
    }
}
