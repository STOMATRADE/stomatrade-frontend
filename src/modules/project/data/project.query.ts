import { useQuery, type UseQueryOptions } from '@tanstack/react-query';
import type { GetProjectsRequest } from '../domain/req/GetProjectsRequest';
import type { GetProjectsByFarmerRequest } from '../domain/req/GetProjectsByFarmerRequest';
import type { GetProjectsByLandRequest } from '../domain/req/GetProjectsByLandRequest';
import type { ProjectListResponse } from '../domain/res/ProjectListResponse';
import type { ProjectDetailResponse } from '../domain/res/ProjectDetailResponse';
import type { ProjectDetailInfoResponse } from '../domain/res/ProjectDetailInfoResponse';
import { ProjectRepositoryImpl } from '../repository/implementation/ProjectRepositoryImpl';
import { GetProjects } from '../usecase/implementation/GetProjects';
import { GetOngoingProjects } from '../usecase/implementation/GetOngoingProjects';
import { GetProjectsByFarmer } from '../usecase/implementation/GetProjectsByFarmer';
import { GetProjectsByLand } from '../usecase/implementation/GetProjectsByLand';
import { GetProjectById } from '../usecase/implementation/GetProjectById';
import { GetProjectDetail } from '../usecase/implementation/GetProjectDetail';
import type { ApiError } from '@/core/utils/http/httpClient';

export const projectQueryKeys = {
    list: (params: GetProjectsRequest) => ['projects', 'list', params] as const,
    ongoing: (params: GetProjectsRequest) => ['projects', 'ongoing', params] as const,
    byFarmer: (params: GetProjectsByFarmerRequest) => ['projects', 'farmer', params] as const,
    byLand: (params: GetProjectsByLandRequest) => ['projects', 'land', params] as const,
    detail: (id: string) => ['projects', 'detail', id] as const,
    fullDetail: (id: string) => ['projects', 'detail', id, 'full'] as const,
};

export const useProjectsQuery = (
    params: GetProjectsRequest,
    options?: UseQueryOptions<ProjectListResponse, ApiError>
) => {
    const repository = new ProjectRepositoryImpl();
    const usecase = new GetProjects(repository);

    return useQuery<ProjectListResponse, ApiError>({
        queryKey: projectQueryKeys.list(params),
        queryFn: () => usecase.execute(params),
        ...options,
    });
};

export const useOngoingProjectsQuery = (
    params: GetProjectsRequest,
    options?: UseQueryOptions<ProjectListResponse, ApiError>
) => {
    const repository = new ProjectRepositoryImpl();
    const usecase = new GetOngoingProjects(repository);

    return useQuery<ProjectListResponse, ApiError>({
        queryKey: projectQueryKeys.ongoing(params),
        queryFn: () => usecase.execute(params),
        ...options,
    });
};

export const useProjectsByFarmerQuery = (
    params: GetProjectsByFarmerRequest,
    options?: UseQueryOptions<ProjectListResponse, ApiError>
) => {
    const repository = new ProjectRepositoryImpl();
    const usecase = new GetProjectsByFarmer(repository);

    return useQuery<ProjectListResponse, ApiError>({
        queryKey: projectQueryKeys.byFarmer(params),
        queryFn: () => usecase.execute(params),
        ...options,
    });
};

export const useProjectsByLandQuery = (
    params: GetProjectsByLandRequest,
    options?: UseQueryOptions<ProjectListResponse, ApiError>
) => {
    const repository = new ProjectRepositoryImpl();
    const usecase = new GetProjectsByLand(repository);

    return useQuery<ProjectListResponse, ApiError>({
        queryKey: projectQueryKeys.byLand(params),
        queryFn: () => usecase.execute(params),
        ...options,
    });
};

export const useProjectDetailQuery = (
    id: string,
    options?: UseQueryOptions<ProjectDetailResponse, ApiError>
) => {
    const repository = new ProjectRepositoryImpl();
    const usecase = new GetProjectById(repository);

    return useQuery<ProjectDetailResponse, ApiError>({
        queryKey: projectQueryKeys.detail(id),
        queryFn: () => usecase.execute(id),
        ...options,
    });
};

export const useProjectFullDetailQuery = (
    id: string,
    options?: UseQueryOptions<ProjectDetailInfoResponse, ApiError>
) => {
    const repository = new ProjectRepositoryImpl();
    const usecase = new GetProjectDetail(repository);

    return useQuery<ProjectDetailInfoResponse, ApiError>({
        queryKey: projectQueryKeys.fullDetail(id),
        queryFn: () => usecase.execute(id),
        ...options,
    });
};
