import type { DepositProfitRequest } from '../../domain/req/DepositProfitRequest';
import type { ProfitActionResponse } from '../../domain/res/ProfitActionResponse';
import type { IDepositProfit } from '../interface/IDepositProfit';
import type { ProfitRepository } from '../../repository/interface/ProfitRepository';

export class DepositProfit implements IDepositProfit {
    constructor(private readonly repository: ProfitRepository) {}

    async execute(request: DepositProfitRequest): Promise<ProfitActionResponse> {
        if (!request.projectId || request.projectId.trim().length === 0) {
            throw new Error('projectId is required');
        }
        if (!request.amount || request.amount.trim().length === 0) {
            throw new Error('amount is required');
        }
        return this.repository.depositProfit(request);
    }
}
