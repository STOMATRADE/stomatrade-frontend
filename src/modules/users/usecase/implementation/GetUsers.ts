import type { GetUsersRequest } from '../../domain/req/GetUsersRequest';
import type { GetUsersResponse } from '../../domain/res/GetUsersResponse';
import type { IGetUsers } from '../interface/IGetUsers';
import type { UsersRepository } from '../../repository/interface/UsersRepository';
import { ApiError } from '@/core/utils/http/httpClient';

export class GetUsers implements IGetUsers {
    constructor(private readonly repository: UsersRepository) {}

    async execute(request: GetUsersRequest): Promise<GetUsersResponse> {
        if (request.page !== undefined && request.page <= 0) {
            throw new ApiError(400, 'page must be greater than 0');
        }
        if (request.limit !== undefined && request.limit <= 0) {
            throw new ApiError(400, 'limit must be greater than 0');
        }
        return this.repository.getUsers(request);
    }
}
