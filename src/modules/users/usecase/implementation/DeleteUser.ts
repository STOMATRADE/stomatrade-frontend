import type { IDeleteUser } from '../interface/IDeleteUser';
import type { UsersRepository } from '../../repository/interface/UsersRepository';
import { ApiError } from '@/core/utils/http/httpClient';

export class DeleteUser implements IDeleteUser {
    constructor(private readonly repository: UsersRepository) {}

    async execute(id: string): Promise<void> {
        if (!id || id.trim().length === 0) {
            throw new ApiError(400, 'id is required');
        }
        return this.repository.deleteUser(id);
    }
}
