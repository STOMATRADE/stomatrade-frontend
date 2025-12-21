import type { InvestmentProfitEntity } from '../../domain/entity/InvestmentProfitEntity';
import type { IGetInvestmentProfit } from '../interface/IGetInvestmentProfit';
import type { InvestmentRepository } from '../../repository/interface/InvestmentRepository';

export class GetInvestmentProfit implements IGetInvestmentProfit {
    constructor(private readonly repository: InvestmentRepository) {}

    async execute(investmentId: string): Promise<InvestmentProfitEntity> {
        if (!investmentId || investmentId.trim().length === 0) {
            throw new Error('investmentId is required');
        }
        return this.repository.getInvestmentProfit(investmentId);
    }
}
