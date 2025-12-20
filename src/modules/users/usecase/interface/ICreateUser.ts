import type { CreateUserRequest } from '../../domain/req/CreateUserRequest';
import type { GetUserResponse } from '../../domain/res/GetUserResponse';

export interface ICreateUser {
    execute(request: CreateUserRequest): Promise<GetUserResponse>;
}
