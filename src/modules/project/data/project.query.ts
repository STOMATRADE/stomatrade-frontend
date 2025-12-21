import { useQuery, type UseQueryOptions } from '@tanstack/react-query';
import type { GetProjectsRequest } from '../domain/req/GetProjectsRequest';
import type { ProjectListResponse } from '../domain/res/ProjectListResponse';
import type { ProjectDetailResponse } from '../domain/res/ProjectDetailResponse';
import { ProjectRepositoryImpl } from '../repository/implementation/ProjectRepositoryImpl';
import { GetProjects } from '../usecase/implementation/GetProjects';
import { GetProjectById } from '../usecase/implementation/GetProjectById';
import type { ApiError } from '@/core/utils/http/httpClient';

export const projectQueryKeys = {
    list: (params: GetProjectsRequest) => ['projects', 'list', params] as const,
    detail: (id: string) => ['projects', 'detail', id] as const,
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
