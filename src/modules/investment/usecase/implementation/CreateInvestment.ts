import type { CreateInvestmentRequest } from '../../domain/req/CreateInvestmentRequest';
import type { InvestmentDetailResponse } from '../../domain/res/InvestmentDetailResponse';
import type { ICreateInvestment } from '../interface/ICreateInvestment';
import type { InvestmentRepository } from '../../repository/interface/InvestmentRepository';

export class CreateInvestment implements ICreateInvestment {
    constructor(private readonly repository: InvestmentRepository) {}

    async execute(request: CreateInvestmentRequest): Promise<InvestmentDetailResponse> {
        if (!request.projectId || request.projectId.trim().length === 0) {
            throw new Error('projectId is required');
        }
        if (request.amount === undefined || Number.isNaN(request.amount) || request.amount <= 0) {
            throw new Error('amount must be greater than 0');
        }
        return this.repository.createInvestment(request);
    }
}
