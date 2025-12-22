import type { GetProfitByProjectRequest } from '../../domain/req/GetProfitByProjectRequest';
import type { GetProfitByUserRequest } from '../../domain/req/GetProfitByUserRequest';
import type { DepositProfitRequest } from '../../domain/req/DepositProfitRequest';
import type { ClaimProfitRequest } from '../../domain/req/ClaimProfitRequest';
import type { ProfitListResponse } from '../../domain/res/ProfitListResponse';
import type { ProfitDetailResponse } from '../../domain/res/ProfitDetailResponse';
import type { ProfitClaimsResponse } from '../../domain/res/ProfitClaimsResponse';
import type { ProfitActionResponse } from '../../domain/res/ProfitActionResponse';

export interface ProfitRepository {
    getProfitPools(): Promise<ProfitListResponse>;
    getProfitByProject(request: GetProfitByProjectRequest): Promise<ProfitDetailResponse>;
    getProfitByUser(request: GetProfitByUserRequest): Promise<ProfitClaimsResponse>;
    depositProfit(request: DepositProfitRequest): Promise<ProfitActionResponse>;
    claimProfit(request: ClaimProfitRequest): Promise<ProfitActionResponse>;
}
