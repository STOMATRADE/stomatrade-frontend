import type { AuthTokenEntity } from '../../domain/entity/AuthTokenEntity';

export interface IRefreshAuthToken {
    execute(): Promise<AuthTokenEntity>;
}
