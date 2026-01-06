import { useQuery, type UseQueryOptions } from '@tanstack/react-query';
import type { GetAnalyticsRequest } from '../domain/req/GetAnalyticsRequest';
import type { GrowthAnalyticsResponse } from '../domain/res/GrowthAnalyticsResponse';
import { AnalyticsRepositoryImpl } from '../repository/implementation/AnalyticsRepositoryImpl';
import { GetProjectGrowth } from '../usecase/implementation/GetProjectGrowth';
import { GetInvestorGrowth } from '../usecase/implementation/GetInvestorGrowth';
import { GetUserGrowth } from '../usecase/implementation/GetUserGrowth';
import type { ApiError } from '@/core/utils/http/httpClient';

export const analyticsQueryKeys = {
    projectGrowth: (params: GetAnalyticsRequest) => ['analytics', 'projects', 'growth', params] as const,
    investorGrowth: (params: GetAnalyticsRequest) => ['analytics', 'investors', 'growth', params] as const,
    userGrowth: (params: GetAnalyticsRequest) => ['analytics', 'users', 'growth', params] as const,
};

export const useProjectGrowthQuery = (
    params: GetAnalyticsRequest,
    options?: UseQueryOptions<GrowthAnalyticsResponse, ApiError>
) => {
    const repository = new AnalyticsRepositoryImpl();
    const usecase = new GetProjectGrowth(repository);

    return useQuery<GrowthAnalyticsResponse, ApiError>({
        queryKey: analyticsQueryKeys.projectGrowth(params),
        queryFn: () => usecase.execute(params),
        ...options,
    });
};

export const useInvestorGrowthQuery = (
    params: GetAnalyticsRequest,
    options?: UseQueryOptions<GrowthAnalyticsResponse, ApiError>
) => {
    const repository = new AnalyticsRepositoryImpl();
    const usecase = new GetInvestorGrowth(repository);

    return useQuery<GrowthAnalyticsResponse, ApiError>({
        queryKey: analyticsQueryKeys.investorGrowth(params),
        queryFn: () => usecase.execute(params),
        ...options,
    });
};

export const useUserGrowthQuery = (
    params: GetAnalyticsRequest,
    options?: UseQueryOptions<GrowthAnalyticsResponse, ApiError>
) => {
    const repository = new AnalyticsRepositoryImpl();
    const usecase = new GetUserGrowth(repository);

    return useQuery<GrowthAnalyticsResponse, ApiError>({
        queryKey: analyticsQueryKeys.userGrowth(params),
        queryFn: () => usecase.execute(params),
        ...options,
    });
};
