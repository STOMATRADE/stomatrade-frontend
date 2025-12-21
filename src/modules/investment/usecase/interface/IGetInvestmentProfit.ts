import type { InvestmentProfitEntity } from '../../domain/entity/InvestmentProfitEntity';

export interface IGetInvestmentProfit {
    execute(investmentId: string): Promise<InvestmentProfitEntity>;
}
