import type { GetInvestmentByProjectRequest } from '../../domain/req/GetInvestmentByProjectRequest';
import type { InvestmentListResponse } from '../../domain/res/InvestmentListResponse';

export interface IGetInvestmentsByProject {
    execute(request: GetInvestmentByProjectRequest): Promise<InvestmentListResponse>;
}
