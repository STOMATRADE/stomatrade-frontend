import type { ClaimRefundRequest } from '../../domain/req/ClaimRefundRequest';
import type { RefundResponse } from '../../domain/res/RefundResponse';
import type { IClaimRefund } from '../interface/IClaimRefund';
import type { RefundRepository } from '../../repository/interface/RefundRepository';
import { ApiError } from '@/core/utils/http/httpClient';

export class ClaimRefund implements IClaimRefund {
    constructor(private readonly repository: RefundRepository) {}

    async execute(request: ClaimRefundRequest): Promise<RefundResponse> {
        if (!request.investmentId || request.investmentId.trim().length === 0) {
            throw new ApiError(400, 'investmentId is required');
        }
        
        return this.repository.claimRefund(request);
    }
}