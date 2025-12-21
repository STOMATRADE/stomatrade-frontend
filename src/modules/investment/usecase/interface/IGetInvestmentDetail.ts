import type { InvestmentDetailResponse } from '../../domain/res/InvestmentDetailResponse';

export interface IGetInvestmentDetail {
    execute(id: string): Promise<InvestmentDetailResponse>;
}
