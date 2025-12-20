import type { AuthNonceRequest } from '../../domain/req/AuthNonceRequest';
import type { AuthNonceResponse } from '../../domain/res/AuthNonceResponse';
import type { IRequestAuthNonce } from '../interface/IRequestAuthNonce';
import type { AuthRepository } from '../../repository/interface/AuthRepository';
import { ApiError } from '@/core/utils/http/httpClient';

export class RequestAuthNonce implements IRequestAuthNonce {
    constructor(private readonly repository: AuthRepository) {}

    async execute(req: AuthNonceRequest): Promise<AuthNonceResponse> {
        if (!req.walletAddress || req.walletAddress.trim().length === 0) {
            throw new ApiError(400, 'walletAddress is required');
        }
        return this.repository.requestNonce(req);
    }
}
