import type { CreateUserRequest } from '../../domain/req/CreateUserRequest';
import type { GetUserResponse } from '../../domain/res/GetUserResponse';
import type { ICreateUser } from '../interface/ICreateUser';
import type { UsersRepository } from '../../repository/interface/UsersRepository';
import { ApiError } from '@/core/utils/http/httpClient';

export class CreateUser implements ICreateUser {
    constructor(private readonly repository: UsersRepository) {}

    async execute(request: CreateUserRequest): Promise<GetUserResponse> {
        if (!request.walletAddress || request.walletAddress.trim().length === 0) {
            throw new ApiError(400, 'walletAddress is required');
        }
        if (!request.role || request.role.trim().length === 0) {
            throw new ApiError(400, 'role is required');
        }
        return this.repository.createUser(request);
    }
}
