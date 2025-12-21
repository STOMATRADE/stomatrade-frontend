import { useQuery, type UseQueryOptions } from '@tanstack/react-query';
import type { ProfitListResponse } from '../domain/res/ProfitListResponse';
import type { ProfitDetailResponse } from '../domain/res/ProfitDetailResponse';
import type { ProfitSummaryEntity } from '../domain/entity/ProfitSummaryEntity';
import { ProfitRepositoryImpl } from '../repository/implementation/ProfitRepositoryImpl';
import { GetProfits } from '../usecase/implementation/GetProfits';
import { GetProfitById } from '../usecase/implementation/GetProfitById';
import { GetProfitByInvestment } from '../usecase/implementation/GetProfitByInvestment';
import { GetProfitSummary } from '../usecase/implementation/GetProfitSummary';
import { profitKeys } from './profit.keys';
import type { ApiError } from '@/core/utils/http/httpClient';

export const useProfitListQuery = (
    options?: UseQueryOptions<ProfitListResponse, ApiError>
) => {
    const repository = new ProfitRepositoryImpl();
    const usecase = new GetProfits(repository);

    return useQuery<ProfitListResponse, ApiError>({
        queryKey: profitKeys.list,
        queryFn: () => usecase.execute(),
        ...options,
    });
};

export const useProfitDetailQuery = (
    id: string,
    options?: UseQueryOptions<ProfitDetailResponse, ApiError>
) => {
    const repository = new ProfitRepositoryImpl();
    const usecase = new GetProfitById(repository);

    return useQuery<ProfitDetailResponse, ApiError>({
        queryKey: profitKeys.detail(id),
        queryFn: () => usecase.execute(id),
        ...options,
    });
};

export const useProfitByInvestmentQuery = (
    investmentId: string,
    options?: UseQueryOptions<ProfitListResponse, ApiError>
) => {
    const repository = new ProfitRepositoryImpl();
    const usecase = new GetProfitByInvestment(repository);

    return useQuery<ProfitListResponse, ApiError>({
        queryKey: profitKeys.byInvestment(investmentId),
        queryFn: () => usecase.execute({ investmentId }),
        ...options,
    });
};

export const useProfitSummaryQuery = (
    options?: UseQueryOptions<ProfitSummaryEntity, ApiError>
) => {
    const repository = new ProfitRepositoryImpl();
    const usecase = new GetProfitSummary(repository);

    return useQuery<ProfitSummaryEntity, ApiError>({
        queryKey: profitKeys.summary,
        queryFn: () => usecase.execute(),
        ...options,
    });
};
