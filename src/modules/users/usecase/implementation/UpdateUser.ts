import type { UpdateUserRequest } from '../../domain/req/UpdateUserRequest';
import type { GetUserResponse } from '../../domain/res/GetUserResponse';
import type { IUpdateUser } from '../interface/IUpdateUser';
import type { UsersRepository } from '../../repository/interface/UsersRepository';
import { ApiError } from '@/core/utils/http/httpClient';

export class UpdateUser implements IUpdateUser {
    constructor(private readonly repository: UsersRepository) {}

    async execute(request: UpdateUserRequest): Promise<GetUserResponse> {
        if (!request.id || request.id.trim().length === 0) {
            throw new ApiError(400, 'id is required');
        }
        if (!request.role || request.role.trim().length === 0) {
            throw new ApiError(400, 'role is required');
        }
        return this.repository.updateUser(request);
    }
}
