import type { GetRefundsByUserRequest } from '../../domain/req/GetRefundsByUserRequest';
import type { RefundListResponse } from '../../domain/res/RefundListResponse';
import type { IGetRefundsByUser } from '../interface/IGetRefundsByUser';
import type { RefundRepository } from '../../repository/interface/RefundRepository';

export class GetRefundsByUser implements IGetRefundsByUser {
    constructor(private readonly repository: RefundRepository) {}

    async execute(request: GetRefundsByUserRequest): Promise<RefundListResponse> {
        return this.repository.getRefundsByUser(request);
    }
}