import type { GetUsersRequest } from '../../domain/req/GetUsersRequest';
import type { GetUsersResponse } from '../../domain/res/GetUsersResponse';

export interface IGetUsers {
    execute(request: GetUsersRequest): Promise<GetUsersResponse>;
}
