import type { GetUserByIdRequest } from '../../domain/req/GetUserByIdRequest';
import type { GetUserResponse } from '../../domain/res/GetUserResponse';
import type { IGetUserById } from '../interface/IGetUserById';
import type { UsersRepository } from '../../repository/interface/UsersRepository';
import { ApiError } from '@/core/utils/http/httpClient';

export class GetUserById implements IGetUserById {
    constructor(private readonly repository: UsersRepository) {}

    async execute(request: GetUserByIdRequest): Promise<GetUserResponse> {
        if (!request.id || request.id.trim().length === 0) {
            throw new ApiError(400, 'id is required');
        }
        return this.repository.getUserById(request);
    }
}
