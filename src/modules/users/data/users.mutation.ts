import { useMutation, type UseMutationOptions } from '@tanstack/react-query';
import type { CreateUserRequest } from '../domain/req/CreateUserRequest';
import type { UpdateUserRequest } from '../domain/req/UpdateUserRequest';
import type { GetUserResponse } from '../domain/res/GetUserResponse';
import { UsersRepositoryImpl } from '../repository/implementation/UsersRepositoryImpl';
import { CreateUser } from '../usecase/implementation/CreateUser';
import { UpdateUser } from '../usecase/implementation/UpdateUser';
import { DeleteUser } from '../usecase/implementation/DeleteUser';
import type { ApiError } from '@/core/utils/http/httpClient';

export const usersMutationKeys = {
    create: ['users', 'create'] as const,
    update: ['users', 'update'] as const,
    delete: ['users', 'delete'] as const,
};

export const useCreateUserMutation = (
    options?: UseMutationOptions<GetUserResponse, ApiError, CreateUserRequest>
) => {
    const repository = new UsersRepositoryImpl();
    const usecase = new CreateUser(repository);

    return useMutation<GetUserResponse, ApiError, CreateUserRequest>({
        mutationKey: usersMutationKeys.create,
        mutationFn: (payload) => usecase.execute(payload),
        ...options,
    });
};

export const useUpdateUserMutation = (
    options?: UseMutationOptions<GetUserResponse, ApiError, UpdateUserRequest>
) => {
    const repository = new UsersRepositoryImpl();
    const usecase = new UpdateUser(repository);

    return useMutation<GetUserResponse, ApiError, UpdateUserRequest>({
        mutationKey: usersMutationKeys.update,
        mutationFn: (payload) => usecase.execute(payload),
        ...options,
    });
};

export const useDeleteUserMutation = (
    options?: UseMutationOptions<void, ApiError, string>
) => {
    const repository = new UsersRepositoryImpl();
    const usecase = new DeleteUser(repository);

    return useMutation<void, ApiError, string>({
        mutationKey: usersMutationKeys.delete,
        mutationFn: (id) => usecase.execute(id),
        ...options,
    });
};
