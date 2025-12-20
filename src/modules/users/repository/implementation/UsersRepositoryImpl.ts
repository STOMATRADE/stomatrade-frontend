import { get, post, patch, del } from '@/core/utils/http/httpClient';
import { API_ROUTES } from '@/core/constant/api';
import type { GetUsersRequest } from '../../domain/req/GetUsersRequest';
import type { GetUserByIdRequest } from '../../domain/req/GetUserByIdRequest';
import type { CreateUserRequest } from '../../domain/req/CreateUserRequest';
import type { UpdateUserRequest } from '../../domain/req/UpdateUserRequest';
import type { GetUsersResponse } from '../../domain/res/GetUsersResponse';
import type { GetUserResponse } from '../../domain/res/GetUserResponse';
import type { UsersRepository } from '../interface/UsersRepository';

export class UsersRepositoryImpl implements UsersRepository {
    getUsers(request: GetUsersRequest): Promise<GetUsersResponse> {
        const params = new URLSearchParams();
        if (request.page !== undefined) params.set('page', String(request.page));
        if (request.limit !== undefined) params.set('limit', String(request.limit));
        const endpoint = params.toString()
            ? `${API_ROUTES.users.root}?${params.toString()}`
            : API_ROUTES.users.root;

        return get<GetUsersResponse>(endpoint);
    }

    getUserById(request: GetUserByIdRequest): Promise<GetUserResponse> {
        return get<GetUserResponse>(API_ROUTES.users.byId(request.id));
    }

    createUser(request: CreateUserRequest): Promise<GetUserResponse> {
        return post<GetUserResponse>(API_ROUTES.users.root, request);
    }

    updateUser(request: UpdateUserRequest): Promise<GetUserResponse> {
        return patch<GetUserResponse>(API_ROUTES.users.byId(request.id), {
            role: request.role,
        });
    }

    deleteUser(id: string): Promise<void> {
        return del<void>(API_ROUTES.users.byId(id));
    }
}
