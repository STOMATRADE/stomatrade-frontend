import type { ClaimProfitRequest } from '../../domain/req/ClaimProfitRequest';
import type { ProfitActionResponse } from '../../domain/res/ProfitActionResponse';

export interface IClaimProfit {
    execute(request: ClaimProfitRequest): Promise<ProfitActionResponse>;
}
