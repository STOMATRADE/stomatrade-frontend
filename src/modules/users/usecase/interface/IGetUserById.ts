import type { GetUserByIdRequest } from '../../domain/req/GetUserByIdRequest';
import type { GetUserResponse } from '../../domain/res/GetUserResponse';

export interface IGetUserById {
    execute(request: GetUserByIdRequest): Promise<GetUserResponse>;
}
