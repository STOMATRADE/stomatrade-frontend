import type { GetInvestmentByProjectRequest } from '../../domain/req/GetInvestmentByProjectRequest';
import type { InvestmentProjectStatsResponse } from '../../domain/res/InvestmentProjectStatsResponse';

export interface IGetInvestmentsByProject {
    execute(request: GetInvestmentByProjectRequest): Promise<InvestmentProjectStatsResponse>;
}
