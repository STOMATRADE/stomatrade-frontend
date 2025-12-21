import { useQuery, type UseQueryOptions } from '@tanstack/react-query';
import type { GetTransactionsRequest } from '../domain/req/GetTransactionsRequest';
import type { TransactionListResponse } from '../domain/res/TransactionListResponse';
import type { TransactionDetailResponse } from '../domain/res/TransactionDetailResponse';
import { TransactionRepositoryImpl } from '../repository/implementation/TransactionRepositoryImpl';
import { GetTransactions } from '../usecase/implementation/GetTransactions';
import { GetTransactionById } from '../usecase/implementation/GetTransactionById';
import type { ApiError } from '@/core/utils/http/httpClient';

export const transactionQueryKeys = {
    list: (params: GetTransactionsRequest) => ['transactions', 'list', params] as const,
    detail: (id: string) => ['transactions', 'detail', id] as const,
};

export const useTransactionsQuery = (
    params: GetTransactionsRequest,
    options?: UseQueryOptions<TransactionListResponse, ApiError>
) => {
    const repository = new TransactionRepositoryImpl();
    const usecase = new GetTransactions(repository);

    return useQuery<TransactionListResponse, ApiError>({
        queryKey: transactionQueryKeys.list(params),
        queryFn: () => usecase.execute(params),
        ...options,
    });
};

export const useTransactionDetailQuery = (
    id: string,
    options?: UseQueryOptions<TransactionDetailResponse, ApiError>
) => {
    const repository = new TransactionRepositoryImpl();
    const usecase = new GetTransactionById(repository);

    return useQuery<TransactionDetailResponse, ApiError>({
        queryKey: transactionQueryKeys.detail(id),
        queryFn: () => usecase.execute(id),
        ...options,
    });
};
