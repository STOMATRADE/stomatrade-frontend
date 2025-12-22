import { useMutation, type UseMutationOptions } from '@tanstack/react-query';
import type { CreateLandRequest } from '../domain/req/CreateLandRequest';
import type { UpdateLandRequest } from '../domain/req/UpdateLandRequest';
import type { LandResponse } from '../domain/res/LandResponse';
import { LandRepositoryImpl } from '../repository/implementation/LandRepositoryImpl';
import { CreateLand } from '../usecase/implementation/CreateLand';
import { UpdateLand } from '../usecase/implementation/UpdateLand';
import { DeleteLand } from '../usecase/implementation/DeleteLand';
import type { ApiError } from '@/core/utils/http/httpClient';

export const landMutationKeys = {
    create: ['lands', 'create'] as const,
    update: ['lands', 'update'] as const,
    delete: ['lands', 'delete'] as const,
};

export const useCreateLandMutation = (
    options?: UseMutationOptions<LandResponse, ApiError, CreateLandRequest>
) => {
    const repository = new LandRepositoryImpl();
    const usecase = new CreateLand(repository);

    return useMutation<LandResponse, ApiError, CreateLandRequest>({
        mutationKey: landMutationKeys.create,
        mutationFn: (payload) => usecase.execute(payload),
        ...options,
    });
};

export const useUpdateLandMutation = (
    options?: UseMutationOptions<LandResponse, ApiError, UpdateLandRequest>
) => {
    const repository = new LandRepositoryImpl();
    const usecase = new UpdateLand(repository);

    return useMutation<LandResponse, ApiError, UpdateLandRequest>({
        mutationKey: landMutationKeys.update,
        mutationFn: (payload) => usecase.execute(payload),
        ...options,
    });
};

export const useDeleteLandMutation = (
    options?: UseMutationOptions<void, ApiError, string>
) => {
    const repository = new LandRepositoryImpl();
    const usecase = new DeleteLand(repository);

    return useMutation<void, ApiError, string>({
        mutationKey: landMutationKeys.delete,
        mutationFn: (id) => usecase.execute(id),
        ...options,
    });
};