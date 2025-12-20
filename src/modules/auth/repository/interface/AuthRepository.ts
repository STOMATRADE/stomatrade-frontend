import type { AuthNonceRequest } from '../../domain/req/AuthNonceRequest';
import type { AuthVerifyRequest } from '../../domain/req/AuthVerifyRequest';
import type { AuthRegisterRequest } from '../../domain/req/AuthRegisterRequest';
import type { AuthNonceResponse } from '../../domain/res/AuthNonceResponse';
import type { AuthVerifyResponse } from '../../domain/res/AuthVerifyResponse';
import type { AuthProfileResponse } from '../../domain/res/AuthProfileResponse';
import type { AuthTokenEntity } from '../../domain/entity/AuthTokenEntity';

export interface AuthRepository {
    requestNonce(req: AuthNonceRequest): Promise<AuthNonceResponse>;
    verifySignature(req: AuthVerifyRequest): Promise<AuthVerifyResponse>;
    getProfile(): Promise<AuthProfileResponse>;
    refreshToken(): Promise<AuthTokenEntity>;
    register(req: AuthRegisterRequest): Promise<AuthVerifyResponse>;
}
