import type { MarkRefundableRequest } from '../../domain/req/MarkRefundableRequest';
import type { RefundResponse } from '../../domain/res/RefundResponse';

export interface IMarkRefundable {
    execute(request: MarkRefundableRequest): Promise<RefundResponse>;
}