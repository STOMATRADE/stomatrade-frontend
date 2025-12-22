import type { MarkRefundableRequest } from '../../domain/req/MarkRefundableRequest';
import type { ClaimRefundRequest } from '../../domain/req/ClaimRefundRequest';
import type { GetRefundsByProjectRequest } from '../../domain/req/GetRefundsByProjectRequest';
import type { GetRefundsByUserRequest } from '../../domain/req/GetRefundsByUserRequest';
import type { RefundResponse } from '../../domain/res/RefundResponse';
import type { RefundListResponse } from '../../domain/res/RefundListResponse';

export interface RefundRepository {
    markRefundable(request: MarkRefundableRequest): Promise<RefundResponse>;
    claimRefund(request: ClaimRefundRequest): Promise<RefundResponse>;
    getRefundsByProject(request: GetRefundsByProjectRequest): Promise<RefundListResponse>;
    getRefundsByUser(request: GetRefundsByUserRequest): Promise<RefundListResponse>;
}