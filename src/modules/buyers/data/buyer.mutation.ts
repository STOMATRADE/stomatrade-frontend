import { useMutation, type UseMutationOptions } from '@tanstack/react-query';
import type { CreateBuyerRequest } from '../domain/req/CreateBuyerRequest';
import type { UpdateBuyerRequest } from '../domain/req/UpdateBuyerRequest';
import type { CreateBuyerHistoryRequest } from '../domain/req/CreateBuyerHistoryRequest';
import type { BuyerResponse } from '../domain/res/BuyerResponse';
import type { BuyerHistoryResponse } from '../domain/res/BuyerHistoryResponse';
import { BuyerRepositoryImpl } from '../repository/implementation/BuyerRepositoryImpl';
import { CreateBuyer } from '../usecase/implementation/CreateBuyer';
import { UpdateBuyer } from '../usecase/implementation/UpdateBuyer';
import { DeleteBuyer } from '../usecase/implementation/DeleteBuyer';
import { CreateBuyerHistory } from '../usecase/implementation/CreateBuyerHistory';
import type { ApiError } from '@/core/utils/http/httpClient';

export const buyerMutationKeys = {
    create: ['buyers', 'create'] as const,
    update: ['buyers', 'update'] as const,
    delete: ['buyers', 'delete'] as const,
    createHistory: ['buyers', 'history', 'create'] as const,
};

export const useCreateBuyerMutation = (
    options?: UseMutationOptions<BuyerResponse, ApiError, CreateBuyerRequest>
) => {
    const repository = new BuyerRepositoryImpl();
    const usecase = new CreateBuyer(repository);

    return useMutation<BuyerResponse, ApiError, CreateBuyerRequest>({
        mutationKey: buyerMutationKeys.create,
        mutationFn: (payload) => usecase.execute(payload),
        ...options,
    });
};

export const useUpdateBuyerMutation = (
    options?: UseMutationOptions<BuyerResponse, ApiError, UpdateBuyerRequest>
) => {
    const repository = new BuyerRepositoryImpl();
    const usecase = new UpdateBuyer(repository);

    return useMutation<BuyerResponse, ApiError, UpdateBuyerRequest>({
        mutationKey: buyerMutationKeys.update,
        mutationFn: (payload) => usecase.execute(payload),
        ...options,
    });
};

export const useDeleteBuyerMutation = (
    options?: UseMutationOptions<void, ApiError, string>
) => {
    const repository = new BuyerRepositoryImpl();
    const usecase = new DeleteBuyer(repository);

    return useMutation<void, ApiError, string>({
        mutationKey: buyerMutationKeys.delete,
        mutationFn: (id) => usecase.execute(id),
        ...options,
    });
};

export const useCreateBuyerHistoryMutation = (
    options?: UseMutationOptions<BuyerHistoryResponse, ApiError, CreateBuyerHistoryRequest>
) => {
    const repository = new BuyerRepositoryImpl();
    const usecase = new CreateBuyerHistory(repository);

    return useMutation<BuyerHistoryResponse, ApiError, CreateBuyerHistoryRequest>({
        mutationKey: buyerMutationKeys.createHistory,
        mutationFn: (payload) => usecase.execute(payload),
        ...options,
    });
};
