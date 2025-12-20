import type { AuthVerifyRequest } from '../../domain/req/AuthVerifyRequest';
import type { AuthVerifyResponse } from '../../domain/res/AuthVerifyResponse';
import type { IVerifyAuthSignature } from '../interface/IVerifyAuthSignature';
import type { AuthRepository } from '../../repository/interface/AuthRepository';
import { ApiError } from '@/core/utils/http/httpClient';

export class VerifyAuthSignature implements IVerifyAuthSignature {
    constructor(private readonly repository: AuthRepository) {}

    async execute(req: AuthVerifyRequest): Promise<AuthVerifyResponse> {
        if (!req.walletAddress || req.walletAddress.trim().length === 0) {
            throw new ApiError(400, 'walletAddress is required');
        }
        if (!req.signature || req.signature.trim().length === 0) {
            throw new ApiError(400, 'signature is required');
        }
        if (!req.message || req.message.trim().length === 0) {
            throw new ApiError(400, 'message is required');
        }
        return this.repository.verifySignature(req);
    }
}
