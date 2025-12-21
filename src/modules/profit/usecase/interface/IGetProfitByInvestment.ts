import type { GetProfitByInvestmentRequest } from '../../domain/req/GetProfitByInvestmentRequest';
import type { ProfitListResponse } from '../../domain/res/ProfitListResponse';

export interface IGetProfitByInvestment {
    execute(request: GetProfitByInvestmentRequest): Promise<ProfitListResponse>;
}
