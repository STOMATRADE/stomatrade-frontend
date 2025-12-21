import { useMutation, type UseMutationOptions } from '@tanstack/react-query';
import type { CreateTransactionRequest } from '../domain/req/CreateTransactionRequest';
import type { TransactionDetailResponse } from '../domain/res/TransactionDetailResponse';
import { TransactionRepositoryImpl } from '../repository/implementation/TransactionRepositoryImpl';
import { CreateTransaction } from '../usecase/implementation/CreateTransaction';
import type { ApiError } from '@/core/utils/http/httpClient';

export const transactionMutationKeys = {
    create: ['transactions', 'create'] as const,
};

export const useCreateTransactionMutation = (
    options?: UseMutationOptions<TransactionDetailResponse, ApiError, CreateTransactionRequest>
) => {
    const repository = new TransactionRepositoryImpl();
    const usecase = new CreateTransaction(repository);

    return useMutation<TransactionDetailResponse, ApiError, CreateTransactionRequest>({
        mutationKey: transactionMutationKeys.create,
        mutationFn: (payload) => usecase.execute(payload),
        ...options,
    });
};
