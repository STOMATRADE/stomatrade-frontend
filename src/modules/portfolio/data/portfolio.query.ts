import { useQuery, type UseQueryOptions } from '@tanstack/react-query';
import type { PortfolioListResponse } from '../domain/res/PortfolioListResponse';
import type { PortfolioDetailResponse } from '../domain/res/PortfolioDetailResponse';
import type { PortfolioSummaryResponse } from '../domain/res/PortfolioSummaryResponse';
import { PortfolioRepositoryImpl } from '../repository/implementation/PortfolioRepositoryImpl';
import { GetMyPortfolio } from '../usecase/implementation/GetMyPortfolio';
import { GetPortfolioById } from '../usecase/implementation/GetPortfolioById';
import { GetPortfolioSummary } from '../usecase/implementation/GetPortfolioSummary';
import { GetPortfolioByProject } from '../usecase/implementation/GetPortfolioByProject';
import { GetTopInvestors } from '../usecase/implementation/GetTopInvestors';
import type { ApiError } from '@/core/utils/http/httpClient';

export const portfolioQueryKeys = {
    list: ['portfolio', 'list'] as const,
    user: (userId: string) => ['portfolio', 'user', userId] as const,
    project: (userId: string, projectId: string) => ['portfolio', 'project', userId, projectId] as const,
    stats: ['portfolio', 'stats'] as const,
    topInvestors: (limit?: number) => ['portfolio', 'top-investors', limit] as const,
};

export const useMyPortfolioQuery = (
    options?: UseQueryOptions<PortfolioListResponse, ApiError>
) => {
    const repository = new PortfolioRepositoryImpl();
    const usecase = new GetMyPortfolio(repository);

    return useQuery<PortfolioListResponse, ApiError>({
        queryKey: portfolioQueryKeys.list,
        queryFn: () => usecase.execute(),
        ...options,
    });
};

export const usePortfolioDetailQuery = (
    userId: string,
    options?: UseQueryOptions<PortfolioListResponse, ApiError>
) => {
    const repository = new PortfolioRepositoryImpl();
    const usecase = new GetPortfolioById(repository);

    return useQuery<PortfolioListResponse, ApiError>({
        queryKey: portfolioQueryKeys.user(userId),
        queryFn: () => usecase.execute(userId),
        ...options,
    });
};

export const usePortfolioSummaryQuery = (
    options?: UseQueryOptions<PortfolioSummaryResponse, ApiError>
) => {
    const repository = new PortfolioRepositoryImpl();
    const usecase = new GetPortfolioSummary(repository);

    return useQuery<PortfolioSummaryResponse, ApiError>({
        queryKey: portfolioQueryKeys.stats,
        queryFn: () => usecase.execute(),
        ...options,
    });
};

export const usePortfolioByProjectQuery = (
    userId: string,
    projectId: string,
    options?: UseQueryOptions<PortfolioDetailResponse, ApiError>
) => {
    const repository = new PortfolioRepositoryImpl();
    const usecase = new GetPortfolioByProject(repository);

    return useQuery<PortfolioDetailResponse, ApiError>({
        queryKey: portfolioQueryKeys.project(userId, projectId),
        queryFn: () => usecase.execute({ userId, projectId }),
        ...options,
    });
};

export const useTopInvestorsQuery = (
    limit?: number,
    options?: UseQueryOptions<any, ApiError>
) => {
    const repository = new PortfolioRepositoryImpl();
    const usecase = new GetTopInvestors(repository);

    return useQuery<any, ApiError>({
        queryKey: portfolioQueryKeys.topInvestors(limit),
        queryFn: () => usecase.execute(limit),
        ...options,
    });
};
