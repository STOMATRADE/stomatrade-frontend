import { get, post, patch, del } from '@/core/utils/http/httpClient';
import { API_ROUTES } from '@/core/constant/api';
import type { GetUsersRequest } from '../../domain/req/GetUsersRequest';
import type { GetUserByIdRequest } from '../../domain/req/GetUserByIdRequest';
import type { CreateUserRequest } from '../../domain/req/CreateUserRequest';
import type { UpdateUserRequest } from '../../domain/req/UpdateUserRequest';
import type { GetUsersResponse } from '../../domain/res/GetUsersResponse';
import type { GetUserResponse } from '../../domain/res/GetUserResponse';
import type { UserEntity } from '../../domain/entity/UserEntity';
import type { UsersRepository } from '../interface/UsersRepository';

interface ApiResponse<T> {
    header: {
        statusCode: number;
        message: string;
        timestamp: string;
    };
    data: T;
}

export class UsersRepositoryImpl implements UsersRepository {
    private mapToEntity(user: any): UserEntity {
        return {
            id: user.id,
            walletAddress: user.walletAddress,
            role: user.role,
            createdAt: typeof user.createdAt === 'string' ? user.createdAt : new Date(user.createdAt).toISOString(),
            updatedAt: typeof user.updatedAt === 'string' ? user.updatedAt : new Date(user.updatedAt).toISOString(),
            deleted: user.deleted,
        };
    }

    async getUsers(request: GetUsersRequest): Promise<GetUsersResponse> {
        const params = new URLSearchParams();
        if (request.page !== undefined) params.set('page', String(request.page));
        if (request.limit !== undefined) params.set('limit', String(request.limit));
        const endpoint = params.toString()
            ? `${API_ROUTES.users.root}?${params.toString()}`
            : API_ROUTES.users.root;

        const response = await get<ApiResponse<any>>(endpoint);
        const data = response.data;

        return {
            data: (data.items || []).map((item: any) => this.mapToEntity(item)),
            meta: data.meta || { total: 0, page: 1, limit: 10, totalPages: 1 },
        };
    }

    async getUserById(request: GetUserByIdRequest): Promise<GetUserResponse> {
        const response = await get<ApiResponse<any>>(API_ROUTES.users.byId(request.id));
        return {
            user: this.mapToEntity(response.data),
        };
    }

    async createUser(request: CreateUserRequest): Promise<GetUserResponse> {
        const response = await post<ApiResponse<any>>(API_ROUTES.users.root, request);
        return {
            user: this.mapToEntity(response.data),
        };
    }

    async updateUser(request: UpdateUserRequest): Promise<GetUserResponse> {
        const response = await patch<ApiResponse<any>>(API_ROUTES.users.byId(request.id), {
            role: request.role,
        });
        return {
            user: this.mapToEntity(response.data),
        };
    }

    async deleteUser(id: string): Promise<void> {
        await del<ApiResponse<void>>(API_ROUTES.users.byId(id));
    }
}
