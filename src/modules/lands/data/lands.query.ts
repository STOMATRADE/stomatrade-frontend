import { useQuery, type UseQueryOptions } from '@tanstack/react-query';
import type { GetLandsRequest } from '../domain/req/GetLandsRequest';
import type { GetLandByIdRequest } from '../domain/req/GetLandByIdRequest';
import type { GetLandsByFarmerRequest } from '../domain/req/GetLandsByFarmerRequest';
import type { LandListResponse } from '../domain/res/LandListResponse';
import type { LandResponse } from '../domain/res/LandResponse';
import { LandRepositoryImpl } from '../repository/implementation/LandRepositoryImpl';
import { GetLands } from '../usecase/implementation/GetLands';
import { GetLandById } from '../usecase/implementation/GetLandById';
import { GetLandsByFarmer } from '../usecase/implementation/GetLandsByFarmer';
import type { ApiError } from '@/core/utils/http/httpClient';

export const landQueryKeys = {
    list: (params: GetLandsRequest) => ['lands', 'list', params] as const,
    detail: (id: string) => ['lands', 'detail', id] as const,
    byFarmer: (params: GetLandsByFarmerRequest) => ['lands', 'by-farmer', params] as const,
};

export const useLandsQuery = (
    params: GetLandsRequest,
    options?: UseQueryOptions<LandListResponse, ApiError>
) => {
    const repository = new LandRepositoryImpl();
    const usecase = new GetLands(repository);

    return useQuery<LandListResponse, ApiError>({
        queryKey: landQueryKeys.list(params),
        queryFn: () => usecase.execute(params),
        ...options,
    });
};

export const useLandDetailQuery = (
    params: GetLandByIdRequest,
    options?: UseQueryOptions<LandResponse, ApiError>
) => {
    const repository = new LandRepositoryImpl();
    const usecase = new GetLandById(repository);

    return useQuery<LandResponse, ApiError>({
        queryKey: landQueryKeys.detail(params.id),
        queryFn: () => usecase.execute(params),
        ...options,
    });
};

export const useLandsByFarmerQuery = (
    params: GetLandsByFarmerRequest,
    options?: UseQueryOptions<LandListResponse, ApiError>
) => {
    const repository = new LandRepositoryImpl();
    const usecase = new GetLandsByFarmer(repository);

    return useQuery<LandListResponse, ApiError>({
        queryKey: landQueryKeys.byFarmer(params),
        queryFn: () => usecase.execute(params),
        ...options,
    });
};