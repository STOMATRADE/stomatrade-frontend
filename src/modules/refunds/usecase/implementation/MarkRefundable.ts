import type { MarkRefundableRequest } from '../../domain/req/MarkRefundableRequest';
import type { RefundResponse } from '../../domain/res/RefundResponse';
import type { IMarkRefundable } from '../interface/IMarkRefundable';
import type { RefundRepository } from '../../repository/interface/RefundRepository';
import { ApiError } from '@/core/utils/http/httpClient';

export class MarkRefundable implements IMarkRefundable {
    constructor(private readonly repository: RefundRepository) { }

    async execute(request: MarkRefundableRequest): Promise<RefundResponse> {
        if (!request.projectId || request.projectId.trim().length === 0) {
            throw new ApiError(400, 'projectId is required');
        }

        return this.repository.markRefundable(request);
    }
}