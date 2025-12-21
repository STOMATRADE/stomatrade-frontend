import { useQuery, type UseQueryOptions } from '@tanstack/react-query';
import type { GetFarmersByCollectorRequest } from '../domain/req/GetFarmersByCollectorRequest';
import type { GetFarmersRequest } from '../domain/req/GetFarmersRequest';
import type { FarmerListResponse } from '../domain/res/FarmerListResponse';
import type { FarmerEntity } from '../domain/entity/FarmerEntity';
import { FarmersRepositoryImpl } from '../repository/implementation/FarmersRepositoryImpl';
import { GetFarmers } from '../usecase/implementation/GetFarmers';
import { GetFarmersByCollector } from '../usecase/implementation/GetFarmersByCollector';
import { GetFarmerById } from '../usecase/implementation/GetFarmerById';
import type { ApiError } from '@/core/utils/http/httpClient';

export const farmersQueryKeys = {
    listAll: (params: GetFarmersRequest) => ['farmers', 'list-all', params] as const,
    listByCollector: (params: GetFarmersByCollectorRequest) =>
        ['farmers', 'list-by-collector', params] as const,
    detail: (id: string) => ['farmers', 'detail', id] as const,
};

export const useFarmersQuery = (
    params: GetFarmersRequest,
    options?: UseQueryOptions<FarmerListResponse, ApiError>
) => {
    const repository = new FarmersRepositoryImpl();
    const usecase = new GetFarmers(repository);

    return useQuery<FarmerListResponse, ApiError>({
        queryKey: farmersQueryKeys.listAll(params),
        queryFn: () => usecase.execute(params),
        ...options,
    });
};

export const useFarmersByCollectorQuery = (
    params: GetFarmersByCollectorRequest,
    options?: UseQueryOptions<FarmerListResponse, ApiError>
) => {
    const repository = new FarmersRepositoryImpl();
    const usecase = new GetFarmersByCollector(repository);

    return useQuery<FarmerListResponse, ApiError>({
        queryKey: farmersQueryKeys.listByCollector(params),
        queryFn: () => usecase.execute(params),
        ...options,
    });
};

export const useFarmerDetailQuery = (
    id: string,
    options?: UseQueryOptions<FarmerEntity, ApiError>
) => {
    const repository = new FarmersRepositoryImpl();
    const usecase = new GetFarmerById(repository);

    return useQuery<FarmerEntity, ApiError>({
        queryKey: farmersQueryKeys.detail(id),
        queryFn: () => usecase.execute(id),
        ...options,
    });
};
