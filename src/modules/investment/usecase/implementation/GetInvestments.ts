import type { GetInvestmentsRequest } from '../../domain/req/GetInvestmentsRequest';
import type { InvestmentListResponse } from '../../domain/res/InvestmentListResponse';
import type { IGetInvestments } from '../interface/IGetInvestments';
import type { InvestmentRepository } from '../../repository/interface/InvestmentRepository';

export class GetInvestments implements IGetInvestments {
    constructor(private readonly repository: InvestmentRepository) {}

    async execute(request: GetInvestmentsRequest): Promise<InvestmentListResponse> {
        if (request.userId !== undefined && request.userId.trim().length === 0) {
            throw new Error('userId must not be empty');
        }
        if (request.projectId !== undefined && request.projectId.trim().length === 0) {
            throw new Error('projectId must not be empty');
        }
        return this.repository.getInvestments(request);
    }
}
