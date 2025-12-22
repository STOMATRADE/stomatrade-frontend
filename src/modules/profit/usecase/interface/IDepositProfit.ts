import type { DepositProfitRequest } from '../../domain/req/DepositProfitRequest';
import type { ProfitActionResponse } from '../../domain/res/ProfitActionResponse';

export interface IDepositProfit {
    execute(request: DepositProfitRequest): Promise<ProfitActionResponse>;
}
