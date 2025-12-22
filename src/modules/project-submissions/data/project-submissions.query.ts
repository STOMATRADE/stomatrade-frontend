import { useQuery, type UseQueryOptions } from '@tanstack/react-query';
import type { GetProjectSubmissionsRequest } from '../domain/req/GetProjectSubmissionsRequest';
import type { GetProjectSubmissionByIdRequest } from '../domain/req/GetProjectSubmissionByIdRequest';
import type { ProjectSubmissionListResponse } from '../domain/res/ProjectSubmissionListResponse';
import type { ProjectSubmissionResponse } from '../domain/res/ProjectSubmissionResponse';
import { ProjectSubmissionRepositoryImpl } from '../repository/implementation/ProjectSubmissionRepositoryImpl';
import { GetProjectSubmissions } from '../usecase/implementation/GetProjectSubmissions';
import { GetProjectSubmissionById } from '../usecase/implementation/GetProjectSubmissionById';
import type { ApiError } from '@/core/utils/http/httpClient';

export const projectSubmissionQueryKeys = {
    list: (params: GetProjectSubmissionsRequest) => ['project-submissions', 'list', params] as const,
    detail: (id: string) => ['project-submissions', 'detail', id] as const,
};

export const useProjectSubmissionsQuery = (
    params: GetProjectSubmissionsRequest,
    options?: UseQueryOptions<ProjectSubmissionListResponse, ApiError>
) => {
    const repository = new ProjectSubmissionRepositoryImpl();
    const usecase = new GetProjectSubmissions(repository);

    return useQuery<ProjectSubmissionListResponse, ApiError>({
        queryKey: projectSubmissionQueryKeys.list(params),
        queryFn: () => usecase.execute(params),
        ...options,
    });
};

export const useProjectSubmissionDetailQuery = (
    params: GetProjectSubmissionByIdRequest,
    options?: UseQueryOptions<ProjectSubmissionResponse, ApiError>
) => {
    const repository = new ProjectSubmissionRepositoryImpl();
    const usecase = new GetProjectSubmissionById(repository);

    return useQuery<ProjectSubmissionResponse, ApiError>({
        queryKey: projectSubmissionQueryKeys.detail(params.id),
        queryFn: () => usecase.execute(params),
        ...options,
    });
};