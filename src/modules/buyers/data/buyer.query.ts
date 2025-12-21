import { useQuery, type UseQueryOptions } from '@tanstack/react-query';
import type { BuyerListResponse } from '../domain/res/BuyerListResponse';
import type { BuyerResponse } from '../domain/res/BuyerResponse';
import type { BuyerHistoryResponse } from '../domain/res/BuyerHistoryResponse';
import { BuyerRepositoryImpl } from '../repository/implementation/BuyerRepositoryImpl';
import { GetBuyers } from '../usecase/implementation/GetBuyers';
import { GetBuyerById } from '../usecase/implementation/GetBuyerById';
import { GetBuyerHistoryByBuyerId } from '../usecase/implementation/GetBuyerHistoryByBuyerId';
import type { ApiError } from '@/core/utils/http/httpClient';

export const buyerQueryKeys = {
    list: ['buyers', 'list'] as const,
    detail: (id: string) => ['buyers', 'detail', id] as const,
    history: (buyerId: string) => ['buyers', 'history', buyerId] as const,
};

export const useBuyersQuery = (
    options?: UseQueryOptions<BuyerListResponse, ApiError>
) => {
    const repository = new BuyerRepositoryImpl();
    const usecase = new GetBuyers(repository);

    return useQuery<BuyerListResponse, ApiError>({
        queryKey: buyerQueryKeys.list,
        queryFn: () => usecase.execute(),
        ...options,
    });
};

export const useBuyerByIdQuery = (
    id: string,
    options?: UseQueryOptions<BuyerResponse, ApiError>
) => {
    const repository = new BuyerRepositoryImpl();
    const usecase = new GetBuyerById(repository);

    return useQuery<BuyerResponse, ApiError>({
        queryKey: buyerQueryKeys.detail(id),
        queryFn: () => usecase.execute(id),
        ...options,
    });
};

export const useBuyerHistoryQuery = (
    buyerId: string,
    options?: UseQueryOptions<BuyerHistoryResponse, ApiError>
) => {
    const repository = new BuyerRepositoryImpl();
    const usecase = new GetBuyerHistoryByBuyerId(repository);

    return useQuery<BuyerHistoryResponse, ApiError>({
        queryKey: buyerQueryKeys.history(buyerId),
        queryFn: () => usecase.execute(buyerId),
        ...options,
    });
};
