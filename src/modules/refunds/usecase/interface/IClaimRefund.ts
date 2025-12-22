import type { ClaimRefundRequest } from '../../domain/req/ClaimRefundRequest';
import type { RefundResponse } from '../../domain/res/RefundResponse';

export interface IClaimRefund {
    execute(request: ClaimRefundRequest): Promise<RefundResponse>;
}