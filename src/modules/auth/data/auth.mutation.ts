import { useMutation, type UseMutationOptions } from '@tanstack/react-query';
import type { AuthNonceRequest } from '../domain/req/AuthNonceRequest';
import type { AuthVerifyRequest } from '../domain/req/AuthVerifyRequest';
import type { AuthRegisterRequest } from '../domain/req/AuthRegisterRequest';
import type { AuthNonceResponse } from '../domain/res/AuthNonceResponse';
import type { AuthVerifyResponse } from '../domain/res/AuthVerifyResponse';
import type { AuthTokenEntity } from '../domain/entity/AuthTokenEntity';
import { AuthRepositoryImpl } from '../repository/implementation/AuthRepositoryImpl';
import { RequestAuthNonce } from '../usecase/implementation/RequestAuthNonce';
import { VerifyAuthSignature } from '../usecase/implementation/VerifyAuthSignature';
import { RefreshAuthToken } from '../usecase/implementation/RefreshAuthToken';
import type { ApiError } from '@/core/utils/http/httpClient';

export const authMutationKeys = {
    nonce: ['auth', 'nonce'] as const,
    verify: ['auth', 'verify'] as const,
    refresh: ['auth', 'refresh'] as const,
    register: ['auth', 'register'] as const,
};

export const useAuthNonceMutation = (
    options?: UseMutationOptions<AuthNonceResponse, ApiError, AuthNonceRequest>
) => {
    const repository = new AuthRepositoryImpl();
    const usecase = new RequestAuthNonce(repository);

    return useMutation<AuthNonceResponse, ApiError, AuthNonceRequest>({
        mutationKey: authMutationKeys.nonce,
        mutationFn: (payload) => usecase.execute(payload),
        ...options,
    });
};

export const useAuthVerifyMutation = (
    options?: UseMutationOptions<AuthVerifyResponse, ApiError, AuthVerifyRequest>
) => {
    const repository = new AuthRepositoryImpl();
    const usecase = new VerifyAuthSignature(repository);

    return useMutation<AuthVerifyResponse, ApiError, AuthVerifyRequest>({
        mutationKey: authMutationKeys.verify,
        mutationFn: (payload) => usecase.execute(payload),
        ...options,
    });
};

export const useAuthRefreshMutation = (
    options?: UseMutationOptions<AuthTokenEntity, ApiError, void>
) => {
    const repository = new AuthRepositoryImpl();
    const usecase = new RefreshAuthToken(repository);

    return useMutation<AuthTokenEntity, ApiError, void>({
        mutationKey: authMutationKeys.refresh,
        mutationFn: () => usecase.execute(),
        ...options,
    });
};

export const useAuthRegisterMutation = (
    options?: UseMutationOptions<AuthVerifyResponse, ApiError, AuthRegisterRequest>
) => {
    const repository = new AuthRepositoryImpl();

    return useMutation<AuthVerifyResponse, ApiError, AuthRegisterRequest>({
        mutationKey: authMutationKeys.register,
        mutationFn: (payload) => repository.register(payload),
        ...options,
    });
};
