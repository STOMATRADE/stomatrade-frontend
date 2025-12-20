import { useMutation, type UseMutationOptions } from '@tanstack/react-query';
import type { CreateFarmerRequest } from '../domain/req/CreateFarmerRequest';
import type { UpdateFarmerRequest } from '../domain/req/UpdateFarmerRequest';
import type { FarmerEntity } from '../domain/entity/FarmerEntity';
import { FarmersRepositoryImpl } from '../repository/implementation/FarmersRepositoryImpl';
import { CreateFarmer } from '../usecase/implementation/CreateFarmer';
import { UpdateFarmer } from '../usecase/implementation/UpdateFarmer';
import { DeleteFarmer } from '../usecase/implementation/DeleteFarmer';
import type { ApiError } from '@/core/utils/http/httpClient';

export const farmersMutationKeys = {
    create: ['farmers', 'create'] as const,
    update: ['farmers', 'update'] as const,
    delete: ['farmers', 'delete'] as const,
};

export const useCreateFarmerMutation = (
    options?: UseMutationOptions<FarmerEntity, ApiError, CreateFarmerRequest>
) => {
    const repository = new FarmersRepositoryImpl();
    const usecase = new CreateFarmer(repository);

    return useMutation<FarmerEntity, ApiError, CreateFarmerRequest>({
        mutationKey: farmersMutationKeys.create,
        mutationFn: (payload) => usecase.execute(payload),
        ...options,
    });
};

export const useUpdateFarmerMutation = (
    options?: UseMutationOptions<FarmerEntity, ApiError, UpdateFarmerRequest>
) => {
    const repository = new FarmersRepositoryImpl();
    const usecase = new UpdateFarmer(repository);

    return useMutation<FarmerEntity, ApiError, UpdateFarmerRequest>({
        mutationKey: farmersMutationKeys.update,
        mutationFn: (payload) => usecase.execute(payload),
        ...options,
    });
};

export const useDeleteFarmerMutation = (
    options?: UseMutationOptions<void, ApiError, string>
) => {
    const repository = new FarmersRepositoryImpl();
    const usecase = new DeleteFarmer(repository);

    return useMutation<void, ApiError, string>({
        mutationKey: farmersMutationKeys.delete,
        mutationFn: (id) => usecase.execute(id),
        ...options,
    });
};
