import type { MarkRefundableRequest } from '../../domain/req/MarkRefundableRequest';
import type { RefundResponse } from '../../domain/res/RefundResponse';
import type { IMarkRefundable } from '../interface/IMarkRefundable';
import type { RefundRepository } from '../../repository/interface/RefundRepository';
import { ApiError } from '@/core/utils/http/httpClient';

export class MarkRefundable implements IMarkRefundable {
    constructor(private readonly repository: RefundRepository) {}

    async execute(request: MarkRefundableRequest): Promise<RefundResponse> {
        if (!request.investmentId || request.investmentId.trim().length === 0) {
            throw new ApiError(400, 'investmentId is required');
        }
        if (!request.reason || request.reason.trim().length === 0) {
            throw new ApiError(400, 'reason is required');
        }
        
        return this.repository.markRefundable(request);
    }
}