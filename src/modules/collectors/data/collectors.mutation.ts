import { useMutation, type UseMutationOptions } from '@tanstack/react-query';
import type { CreateCollectorRequest } from '../domain/req/CreateCollectorRequest';
import type { UpdateCollectorRequest } from '../domain/req/UpdateCollectorRequest';
import type { CollectorResponse } from '../domain/res/CollectorResponse';
import { CollectorsRepositoryImpl } from '../repository/implementation/CollectorsRepositoryImpl';
import { CreateCollector } from '../usecase/implementation/CreateCollector';
import { UpdateCollector } from '../usecase/implementation/UpdateCollector';
import { DeleteCollector } from '../usecase/implementation/DeleteCollector';
import type { ApiError } from '@/core/utils/http/httpClient';

export const collectorsMutationKeys = {
    create: ['collectors', 'create'] as const,
    update: ['collectors', 'update'] as const,
    delete: ['collectors', 'delete'] as const,
};

export const useCreateCollectorMutation = (
    options?: UseMutationOptions<CollectorResponse, ApiError, CreateCollectorRequest>
) => {
    const repository = new CollectorsRepositoryImpl();
    const usecase = new CreateCollector(repository);

    return useMutation<CollectorResponse, ApiError, CreateCollectorRequest>({
        mutationKey: collectorsMutationKeys.create,
        mutationFn: (payload) => usecase.execute(payload),
        ...options,
    });
};

export const useUpdateCollectorMutation = (
    options?: UseMutationOptions<CollectorResponse, ApiError, UpdateCollectorRequest>
) => {
    const repository = new CollectorsRepositoryImpl();
    const usecase = new UpdateCollector(repository);

    return useMutation<CollectorResponse, ApiError, UpdateCollectorRequest>({
        mutationKey: collectorsMutationKeys.update,
        mutationFn: (payload) => usecase.execute(payload),
        ...options,
    });
};

export const useDeleteCollectorMutation = (
    options?: UseMutationOptions<void, ApiError, string>
) => {
    const repository = new CollectorsRepositoryImpl();
    const usecase = new DeleteCollector(repository);

    return useMutation<void, ApiError, string>({
        mutationKey: collectorsMutationKeys.delete,
        mutationFn: (id) => usecase.execute(id),
        ...options,
    });
};
