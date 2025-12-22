import type { ClaimProfitRequest } from '../../domain/req/ClaimProfitRequest';
import type { ProfitActionResponse } from '../../domain/res/ProfitActionResponse';
import type { IClaimProfit } from '../interface/IClaimProfit';
import type { ProfitRepository } from '../../repository/interface/ProfitRepository';

export class ClaimProfit implements IClaimProfit {
    constructor(private readonly repository: ProfitRepository) {}

    async execute(request: ClaimProfitRequest): Promise<ProfitActionResponse> {
        if (!request.userId || request.userId.trim().length === 0) {
            throw new Error('userId is required');
        }
        if (!request.projectId || request.projectId.trim().length === 0) {
            throw new Error('projectId is required');
        }
        return this.repository.claimProfit(request);
    }
}
