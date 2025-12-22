import type { GetRefundsByProjectRequest } from '../../domain/req/GetRefundsByProjectRequest';
import type { RefundListResponse } from '../../domain/res/RefundListResponse';
import type { IGetRefundsByProject } from '../interface/IGetRefundsByProject';
import type { RefundRepository } from '../../repository/interface/RefundRepository';

export class GetRefundsByProject implements IGetRefundsByProject {
    constructor(private readonly repository: RefundRepository) {}

    async execute(request: GetRefundsByProjectRequest): Promise<RefundListResponse> {
        return this.repository.getRefundsByProject(request);
    }
}