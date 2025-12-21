import type { GetProfitByInvestmentRequest } from '../../domain/req/GetProfitByInvestmentRequest';
import type { ProfitListResponse } from '../../domain/res/ProfitListResponse';
import type { IGetProfitByInvestment } from '../interface/IGetProfitByInvestment';
import type { ProfitRepository } from '../../repository/interface/ProfitRepository';

export class GetProfitByInvestment implements IGetProfitByInvestment {
    constructor(private readonly repository: ProfitRepository) {}

    async execute(request: GetProfitByInvestmentRequest): Promise<ProfitListResponse> {
        if (!request.investmentId || request.investmentId.trim().length === 0) {
            throw new Error('investmentId is required');
        }
        return this.repository.getProfitByInvestment(request.investmentId);
    }
}
