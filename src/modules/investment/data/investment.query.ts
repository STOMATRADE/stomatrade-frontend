import { useQuery, type UseQueryOptions } from '@tanstack/react-query';
import type { InvestmentListResponse } from '../domain/res/InvestmentListResponse';
import type { InvestmentDetailResponse } from '../domain/res/InvestmentDetailResponse';
import type { InvestmentProfitEntity } from '../domain/entity/InvestmentProfitEntity';
import { InvestmentRepositoryImpl } from '../repository/implementation/InvestmentRepositoryImpl';
import { GetInvestments } from '../usecase/implementation/GetInvestments';
import { GetInvestmentDetail } from '../usecase/implementation/GetInvestmentDetail';
import { GetInvestmentProfit } from '../usecase/implementation/GetInvestmentProfit';
import { GetInvestmentsByProject } from '../usecase/implementation/GetInvestmentsByProject';
import type { ApiError } from '@/core/utils/http/httpClient';

export const investmentQueryKeys = {
    list: ['investments'] as const,
    byProject: (projectId: string) => ['investments', 'project', projectId] as const,
    detail: (id: string) => ['investments', id] as const,
    profit: (id: string) => ['investments', id, 'profit'] as const,
};

export const useMyInvestmentsQuery = (
    options?: UseQueryOptions<InvestmentListResponse, ApiError>
) => {
    const repository = new InvestmentRepositoryImpl();
    const usecase = new GetInvestments(repository);

    return useQuery<InvestmentListResponse, ApiError>({
        queryKey: investmentQueryKeys.list,
        queryFn: () => usecase.execute(),
        ...options,
    });
};

export const useInvestmentsByProjectQuery = (
    projectId: string,
    options?: UseQueryOptions<InvestmentListResponse, ApiError>
) => {
    const repository = new InvestmentRepositoryImpl();
    const usecase = new GetInvestmentsByProject(repository);

    return useQuery<InvestmentListResponse, ApiError>({
        queryKey: investmentQueryKeys.byProject(projectId),
        queryFn: () => usecase.execute({ projectId }),
        ...options,
    });
};

export const useInvestmentDetailQuery = (
    id: string,
    options?: UseQueryOptions<InvestmentDetailResponse, ApiError>
) => {
    const repository = new InvestmentRepositoryImpl();
    const usecase = new GetInvestmentDetail(repository);

    return useQuery<InvestmentDetailResponse, ApiError>({
        queryKey: investmentQueryKeys.detail(id),
        queryFn: () => usecase.execute(id),
        ...options,
    });
};

export const useInvestmentProfitQuery = (
    id: string,
    options?: UseQueryOptions<InvestmentProfitEntity, ApiError>
) => {
    const repository = new InvestmentRepositoryImpl();
    const usecase = new GetInvestmentProfit(repository);

    return useQuery<InvestmentProfitEntity, ApiError>({
        queryKey: investmentQueryKeys.profit(id),
        queryFn: () => usecase.execute(id),
        ...options,
    });
};
