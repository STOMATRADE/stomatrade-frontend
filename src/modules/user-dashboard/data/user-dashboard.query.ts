import { useQuery, type UseQueryOptions } from '@tanstack/react-query';
import type { GetUserDashboardCashRequest } from '../domain/req/GetUserDashboardCashRequest';
import type { GetUserDashboardAssetsRequest } from '../domain/req/GetUserDashboardAssetsRequest';
import type { GetUserDashboardTotalRequest } from '../domain/req/GetUserDashboardTotalRequest';
import type { UserDashboardCashResponse } from '../domain/res/UserDashboardCashResponse';
import type { UserDashboardAssetsResponse } from '../domain/res/UserDashboardAssetsResponse';
import type { UserDashboardTotalResponse } from '../domain/res/UserDashboardTotalResponse';
import { UserDashboardRepositoryImpl } from '../repository/implementation/UserDashboardRepositoryImpl';
import { GetUserDashboardCash } from '../usecase/implementation/GetUserDashboardCash';
import { GetUserDashboardAssets } from '../usecase/implementation/GetUserDashboardAssets';
import { GetUserDashboardTotal } from '../usecase/implementation/GetUserDashboardTotal';
import type { ApiError } from '@/core/utils/http/httpClient';

export const userDashboardQueryKeys = {
    cash: (userId: string) => ['user-dashboard', 'cash', userId] as const,
    assets: (userId: string) => ['user-dashboard', 'assets', userId] as const,
    total: (userId: string) => ['user-dashboard', 'total', userId] as const,
};

export const useUserDashboardCashQuery = (
    params: GetUserDashboardCashRequest,
    options?: UseQueryOptions<UserDashboardCashResponse, ApiError>
) => {
    const repository = new UserDashboardRepositoryImpl();
    const usecase = new GetUserDashboardCash(repository);

    return useQuery<UserDashboardCashResponse, ApiError>({
        queryKey: userDashboardQueryKeys.cash(params.userId),
        queryFn: () => usecase.execute(params),
        ...options,
    });
};

export const useUserDashboardAssetsQuery = (
    params: GetUserDashboardAssetsRequest,
    options?: UseQueryOptions<UserDashboardAssetsResponse, ApiError>
) => {
    const repository = new UserDashboardRepositoryImpl();
    const usecase = new GetUserDashboardAssets(repository);

    return useQuery<UserDashboardAssetsResponse, ApiError>({
        queryKey: userDashboardQueryKeys.assets(params.userId),
        queryFn: () => usecase.execute(params),
        ...options,
    });
};

export const useUserDashboardTotalQuery = (
    params: GetUserDashboardTotalRequest,
    options?: UseQueryOptions<UserDashboardTotalResponse, ApiError>
) => {
    const repository = new UserDashboardRepositoryImpl();
    const usecase = new GetUserDashboardTotal(repository);

    return useQuery<UserDashboardTotalResponse, ApiError>({
        queryKey: userDashboardQueryKeys.total(params.userId),
        queryFn: () => usecase.execute(params),
        ...options,
    });
};