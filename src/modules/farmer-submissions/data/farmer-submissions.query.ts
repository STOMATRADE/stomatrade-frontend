import { useQuery, type UseQueryOptions } from '@tanstack/react-query';
import type { GetFarmerSubmissionsRequest } from '../domain/req/GetFarmerSubmissionsRequest';
import type { GetFarmerSubmissionByIdRequest } from '../domain/req/GetFarmerSubmissionByIdRequest';
import type { FarmerSubmissionListResponse } from '../domain/res/FarmerSubmissionListResponse';
import type { FarmerSubmissionResponse } from '../domain/res/FarmerSubmissionResponse';
import { FarmerSubmissionRepositoryImpl } from '../repository/implementation/FarmerSubmissionRepositoryImpl';
import { GetFarmerSubmissions } from '../usecase/implementation/GetFarmerSubmissions';
import { GetFarmerSubmissionById } from '../usecase/implementation/GetFarmerSubmissionById';
import type { ApiError } from '@/core/utils/http/httpClient';

export const farmerSubmissionQueryKeys = {
    list: (params: GetFarmerSubmissionsRequest) => ['farmer-submissions', 'list', params] as const,
    detail: (id: string) => ['farmer-submissions', 'detail', id] as const,
};

export const useFarmerSubmissionsQuery = (
    params: GetFarmerSubmissionsRequest,
    options?: UseQueryOptions<FarmerSubmissionListResponse, ApiError>
) => {
    const repository = new FarmerSubmissionRepositoryImpl();
    const usecase = new GetFarmerSubmissions(repository);

    return useQuery<FarmerSubmissionListResponse, ApiError>({
        queryKey: farmerSubmissionQueryKeys.list(params),
        queryFn: () => usecase.execute(params),
        ...options,
    });
};

export const useFarmerSubmissionDetailQuery = (
    params: GetFarmerSubmissionByIdRequest,
    options?: UseQueryOptions<FarmerSubmissionResponse, ApiError>
) => {
    const repository = new FarmerSubmissionRepositoryImpl();
    const usecase = new GetFarmerSubmissionById(repository);

    return useQuery<FarmerSubmissionResponse, ApiError>({
        queryKey: farmerSubmissionQueryKeys.detail(params.id),
        queryFn: () => usecase.execute(params),
        ...options,
    });
};