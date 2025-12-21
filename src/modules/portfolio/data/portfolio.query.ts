import { useQuery, type UseQueryOptions } from '@tanstack/react-query';
import type { PortfolioListResponse } from '../domain/res/PortfolioListResponse';
import type { PortfolioDetailResponse } from '../domain/res/PortfolioDetailResponse';
import type { PortfolioSummaryResponse } from '../domain/res/PortfolioSummaryResponse';
import { PortfolioRepositoryImpl } from '../repository/implementation/PortfolioRepositoryImpl';
import { GetMyPortfolio } from '../usecase/implementation/GetMyPortfolio';
import { GetPortfolioById } from '../usecase/implementation/GetPortfolioById';
import { GetPortfolioSummary } from '../usecase/implementation/GetPortfolioSummary';
import type { ApiError } from '@/core/utils/http/httpClient';

export const portfolioQueryKeys = {
    list: ['portfolio', 'list'] as const,
    detail: (id: string) => ['portfolio', 'detail', id] as const,
    summary: ['portfolio', 'summary'] as const,
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
    portfolioId: string,
    options?: UseQueryOptions<PortfolioDetailResponse, ApiError>
) => {
    const repository = new PortfolioRepositoryImpl();
    const usecase = new GetPortfolioById(repository);

    return useQuery<PortfolioDetailResponse, ApiError>({
        queryKey: portfolioQueryKeys.detail(portfolioId),
        queryFn: () => usecase.execute({ portfolioId }),
        ...options,
    });
};

export const usePortfolioSummaryQuery = (
    options?: UseQueryOptions<PortfolioSummaryResponse, ApiError>
) => {
    const repository = new PortfolioRepositoryImpl();
    const usecase = new GetPortfolioSummary(repository);

    return useQuery<PortfolioSummaryResponse, ApiError>({
        queryKey: portfolioQueryKeys.summary,
        queryFn: () => usecase.execute(),
        ...options,
    });
};
