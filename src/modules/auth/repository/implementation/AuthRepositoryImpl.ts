import { get, post } from '@/core/utils/http/httpClient';
import { API_ROUTES } from '@/core/constant/api';
import type { AuthNonceRequest } from '../../domain/req/AuthNonceRequest';
import type { AuthVerifyRequest } from '../../domain/req/AuthVerifyRequest';
import type { AuthRegisterRequest } from '../../domain/req/AuthRegisterRequest';
import type { AuthNonceResponse } from '../../domain/res/AuthNonceResponse';
import type { AuthVerifyResponse } from '../../domain/res/AuthVerifyResponse';
import type { AuthProfileResponse } from '../../domain/res/AuthProfileResponse';
import type { AuthTokenEntity } from '../../domain/entity/AuthTokenEntity';
import type { AuthRepository } from '../interface/AuthRepository';

export class AuthRepositoryImpl implements AuthRepository {
    requestNonce(req: AuthNonceRequest): Promise<AuthNonceResponse> {
        return post<AuthNonceResponse>(API_ROUTES.auth.nonce, req);
    }

    verifySignature(req: AuthVerifyRequest): Promise<AuthVerifyResponse> {
        return post<AuthVerifyResponse>(API_ROUTES.auth.verify, req);
    }

    getProfile(): Promise<AuthProfileResponse> {
        return get<AuthProfileResponse>(API_ROUTES.auth.profile);
    }

    refreshToken(): Promise<AuthTokenEntity> {
        return post<AuthTokenEntity>(API_ROUTES.auth.refresh);
    }

    register(req: AuthRegisterRequest): Promise<AuthVerifyResponse> {
        return post<AuthVerifyResponse>(API_ROUTES.auth.register, req);
    }
}
