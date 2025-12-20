import type { UpdateUserRequest } from '../../domain/req/UpdateUserRequest';
import type { GetUserResponse } from '../../domain/res/GetUserResponse';

export interface IUpdateUser {
    execute(request: UpdateUserRequest): Promise<GetUserResponse>;
}
