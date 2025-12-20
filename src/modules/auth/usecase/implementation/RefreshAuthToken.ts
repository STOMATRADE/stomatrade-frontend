import type { AuthTokenEntity } from '../../domain/entity/AuthTokenEntity';
import type { IRefreshAuthToken } from '../interface/IRefreshAuthToken';
import type { AuthRepository } from '../../repository/interface/AuthRepository';

export class RefreshAuthToken implements IRefreshAuthToken {
    constructor(private readonly repository: AuthRepository) {}

    async execute(): Promise<AuthTokenEntity> {
        return this.repository.refreshToken();
    }
}
