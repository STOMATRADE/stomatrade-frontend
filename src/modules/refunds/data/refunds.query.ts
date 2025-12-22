import { useQuery, type UseQueryOptions } from '@tanstack/react-query';
import type { GetRefundsByProjectRequest } from '../domain/req/GetRefundsByProjectRequest';
import type { GetRefundsByUserRequest } from '../domain/req/GetRefundsByUserRequest';
import type { RefundListResponse } from '../domain/res/RefundListResponse';
import type { RefundResponse } from '../domain/res/RefundResponse';
import { RefundRepositoryImpl } from '../repository/implementation/RefundRepositoryImpl';
import { GetRefundsByProject } from '../usecase/implementation/GetRefundsByProject';
import { GetRefundsByUser } from '../usecase/implementation/GetRefundsByUser';
import type { ApiError } from '@/core/utils/http/httpClient';

export const refundQueryKeys = {
    byProject: (params: GetRefundsByProjectRequest) => ['refunds', 'by-project', params] as const,
    byUser: (params: GetRefundsByUserRequest) => ['refunds', 'by-user', params] as const,
};

export const useRefundsByProjectQuery = (
    params: GetRefundsByProjectRequest,
    options?: UseQueryOptions<RefundListResponse, ApiError>
) => {
    const repository = new RefundRepositoryImpl();
    const usecase = new GetRefundsByProject(repository);

    return useQuery<RefundListResponse, ApiError>({
        queryKey: refundQueryKeys.byProject(params),
        queryFn: () => usecase.execute(params),
        ...options,
    });
};

export const useRefundsByUserQuery = (
    params: GetRefundsByUserRequest,
    options?: UseQueryOptions<RefundListResponse, ApiError>
) => {
    const repository = new RefundRepositoryImpl();
    const usecase = new GetRefundsByUser(repository);

    return useQuery<RefundListResponse, ApiError>({
        queryKey: refundQueryKeys.byUser(params),
        queryFn: () => usecase.execute(params),
        ...options,
    });
};