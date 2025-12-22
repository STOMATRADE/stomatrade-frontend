import { useQuery, type UseQueryOptions } from '@tanstack/react-query';
import type { ProfitListResponse } from '../domain/res/ProfitListResponse';
import type { ProfitDetailResponse } from '../domain/res/ProfitDetailResponse';
import type { ProfitClaimsResponse } from '../domain/res/ProfitClaimsResponse';
import { ProfitRepositoryImpl } from '../repository/implementation/ProfitRepositoryImpl';
import { GetProfitPools } from '../usecase/implementation/GetProfitPools';
import { GetProfitByProject } from '../usecase/implementation/GetProfitByProject';
import { GetProfitByUser } from '../usecase/implementation/GetProfitByUser';
import { profitKeys } from './profit.keys';
import type { ApiError } from '@/core/utils/http/httpClient';

export const useProfitPoolsQuery = (
    options?: UseQueryOptions<ProfitListResponse, ApiError>
) => {
    const repository = new ProfitRepositoryImpl();
    const usecase = new GetProfitPools(repository);

    return useQuery<ProfitListResponse, ApiError>({
        queryKey: profitKeys.pools,
        queryFn: () => usecase.execute(),
        ...options,
    });
};

export const useProfitByProjectQuery = (
    projectId: string,
    options?: UseQueryOptions<ProfitDetailResponse, ApiError>
) => {
    const repository = new ProfitRepositoryImpl();
    const usecase = new GetProfitByProject(repository);

    return useQuery<ProfitDetailResponse, ApiError>({
        queryKey: profitKeys.byProject(projectId),
        queryFn: () => usecase.execute({ projectId }),
        ...options,
    });
};

export const useProfitByUserQuery = (
    userId: string,
    options?: UseQueryOptions<ProfitClaimsResponse, ApiError>
) => {
    const repository = new ProfitRepositoryImpl();
    const usecase = new GetProfitByUser(repository);

    return useQuery<ProfitClaimsResponse, ApiError>({
        queryKey: profitKeys.byUser(userId),
        queryFn: () => usecase.execute({ userId }),
        ...options,
    });
};
