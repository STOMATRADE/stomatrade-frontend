import type { GetInvestmentsRequest } from '../../domain/req/GetInvestmentsRequest';
import type { InvestmentListResponse } from '../../domain/res/InvestmentListResponse';

export interface IGetInvestments {
    execute(request: GetInvestmentsRequest): Promise<InvestmentListResponse>;
}
