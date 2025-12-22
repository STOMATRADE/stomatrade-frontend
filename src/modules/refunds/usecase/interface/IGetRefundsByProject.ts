import type { GetRefundsByProjectRequest } from '../../domain/req/GetRefundsByProjectRequest';
import type { RefundListResponse } from '../../domain/res/RefundListResponse';

export interface IGetRefundsByProject {
    execute(request: GetRefundsByProjectRequest): Promise<RefundListResponse>;
}