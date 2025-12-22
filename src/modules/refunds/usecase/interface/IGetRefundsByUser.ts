import type { GetRefundsByUserRequest } from '../../domain/req/GetRefundsByUserRequest';
import type { RefundListResponse } from '../../domain/res/RefundListResponse';

export interface IGetRefundsByUser {
    execute(request: GetRefundsByUserRequest): Promise<RefundListResponse>;
}