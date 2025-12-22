import { useQuery, type UseQueryOptions } from '@tanstack/react-query';
import type { GetInvestmentsRequest } from '../domain/req/GetInvestmentsRequest';
import type { InvestmentListResponse } from '../domain/res/InvestmentListResponse';
import type { InvestmentDetailResponse } from '../domain/res/InvestmentDetailResponse';
import type { InvestmentProjectStatsResponse } from '../domain/res/InvestmentProjectStatsResponse';
import { InvestmentRepositoryImpl } from '../repository/implementation/InvestmentRepositoryImpl';
import { GetInvestments } from '../usecase/implementation/GetInvestments';
import { GetInvestmentDetail } from '../usecase/implementation/GetInvestmentDetail';
import { GetInvestmentsByProject } from '../usecase/implementation/GetInvestmentsByProject';
import type { ApiError } from '@/core/utils/http/httpClient';

export const investmentQueryKeys = {
    list: (params: GetInvestmentsRequest) => ['investments', 'list', params] as const,
    projectStats: (projectId: string) => ['investments', 'project', projectId, 'stats'] as const,
    detail: (id: string) => ['investments', 'detail', id] as const,
};

export const useInvestmentsQuery = (
    params: GetInvestmentsRequest,
    options?: UseQueryOptions<InvestmentListResponse, ApiError>
) => {
    const repository = new InvestmentRepositoryImpl();
    const usecase = new GetInvestments(repository);

    return useQuery<InvestmentListResponse, ApiError>({
        queryKey: investmentQueryKeys.list(params),
        queryFn: () => usecase.execute(params),
        ...options,
    });
};

export const useInvestmentProjectStatsQuery = (
    projectId: string,
    options?: UseQueryOptions<InvestmentProjectStatsResponse, ApiError>
) => {
    const repository = new InvestmentRepositoryImpl();
    const usecase = new GetInvestmentsByProject(repository);

    return useQuery<InvestmentProjectStatsResponse, ApiError>({
        queryKey: investmentQueryKeys.projectStats(projectId),
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
