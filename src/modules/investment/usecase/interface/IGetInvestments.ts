import type { InvestmentListResponse } from '../../domain/res/InvestmentListResponse';

export interface IGetInvestments {
    execute(): Promise<InvestmentListResponse>;
}
