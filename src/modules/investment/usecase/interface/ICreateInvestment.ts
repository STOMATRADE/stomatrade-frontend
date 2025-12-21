import type { CreateInvestmentRequest } from '../../domain/req/CreateInvestmentRequest';
import type { InvestmentDetailResponse } from '../../domain/res/InvestmentDetailResponse';

export interface ICreateInvestment {
    execute(request: CreateInvestmentRequest): Promise<InvestmentDetailResponse>;
}
