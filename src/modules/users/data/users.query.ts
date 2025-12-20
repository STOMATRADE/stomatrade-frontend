import { useQuery, type UseQueryOptions } from '@tanstack/react-query';
import type { GetUsersRequest } from '../domain/req/GetUsersRequest';
import type { GetUserByIdRequest } from '../domain/req/GetUserByIdRequest';
import type { GetUsersResponse } from '../domain/res/GetUsersResponse';
import type { GetUserResponse } from '../domain/res/GetUserResponse';
import { UsersRepositoryImpl } from '../repository/implementation/UsersRepositoryImpl';
import { GetUsers } from '../usecase/implementation/GetUsers';
import { GetUserById } from '../usecase/implementation/GetUserById';
import type { ApiError } from '@/core/utils/http/httpClient';

export const usersQueryKeys = {
    list: (params: GetUsersRequest) => ['users', 'list', params] as const,
    detail: (id: string) => ['users', 'detail', id] as const,
};

export const useUsersQuery = (
    params: GetUsersRequest,
    options?: UseQueryOptions<GetUsersResponse, ApiError>
) => {
    const repository = new UsersRepositoryImpl();
    const usecase = new GetUsers(repository);

    return useQuery<GetUsersResponse, ApiError>({
        queryKey: usersQueryKeys.list(params),
        queryFn: () => usecase.execute(params),
        ...options,
    });
};

export const useUserDetailQuery = (
    params: GetUserByIdRequest,
    options?: UseQueryOptions<GetUserResponse, ApiError>
) => {
    const repository = new UsersRepositoryImpl();
    const usecase = new GetUserById(repository);

    return useQuery<GetUserResponse, ApiError>({
        queryKey: usersQueryKeys.detail(params.id),
        queryFn: () => usecase.execute(params),
        ...options,
    });
};
