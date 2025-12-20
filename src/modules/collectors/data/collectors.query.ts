import { useQuery, type UseQueryOptions } from '@tanstack/react-query';
import type { GetCollectorsRequest } from '../domain/req/GetCollectorsRequest';
import type { CollectorListResponse } from '../domain/res/CollectorListResponse';
import type { CollectorResponse } from '../domain/res/CollectorResponse';
import { CollectorsRepositoryImpl } from '../repository/implementation/CollectorsRepositoryImpl';
import { GetCollectors } from '../usecase/implementation/GetCollectors';
import { GetCollectorById } from '../usecase/implementation/GetCollectorById';
import type { ApiError } from '@/core/utils/http/httpClient';

export const collectorsQueryKeys = {
    list: (params: GetCollectorsRequest) => ['collectors', 'list', params] as const,
    detail: (id: string) => ['collectors', 'detail', id] as const,
};

export const useCollectorsQuery = (
    params: GetCollectorsRequest,
    options?: UseQueryOptions<CollectorListResponse, ApiError>
) => {
    const repository = new CollectorsRepositoryImpl();
    const usecase = new GetCollectors(repository);

    return useQuery<CollectorListResponse, ApiError>({
        queryKey: collectorsQueryKeys.list(params),
        queryFn: () => usecase.execute(params),
        ...options,
    });
};

export const useCollectorDetailQuery = (
    id: string,
    options?: UseQueryOptions<CollectorResponse, ApiError>
) => {
    const repository = new CollectorsRepositoryImpl();
    const usecase = new GetCollectorById(repository);

    return useQuery<CollectorResponse, ApiError>({
        queryKey: collectorsQueryKeys.detail(id),
        queryFn: () => usecase.execute(id),
        ...options,
    });
};
