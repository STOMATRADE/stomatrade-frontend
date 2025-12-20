import type { GetUsersRequest } from '../../domain/req/GetUsersRequest';
import type { GetUserByIdRequest } from '../../domain/req/GetUserByIdRequest';
import type { CreateUserRequest } from '../../domain/req/CreateUserRequest';
import type { UpdateUserRequest } from '../../domain/req/UpdateUserRequest';
import type { GetUsersResponse } from '../../domain/res/GetUsersResponse';
import type { GetUserResponse } from '../../domain/res/GetUserResponse';

export interface UsersRepository {
    getUsers(request: GetUsersRequest): Promise<GetUsersResponse>;
    getUserById(request: GetUserByIdRequest): Promise<GetUserResponse>;
    createUser(request: CreateUserRequest): Promise<GetUserResponse>;
    updateUser(request: UpdateUserRequest): Promise<GetUserResponse>;
    deleteUser(id: string): Promise<void>;
}
