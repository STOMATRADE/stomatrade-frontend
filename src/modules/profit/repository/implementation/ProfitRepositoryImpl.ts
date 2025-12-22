import { get, post } from '@/core/utils/http/httpClient';
import { API_ROUTES } from '@/core/constant/api';
import type { GetProfitByProjectRequest } from '../../domain/req/GetProfitByProjectRequest';
import type { GetProfitByUserRequest } from '../../domain/req/GetProfitByUserRequest';
import type { DepositProfitRequest } from '../../domain/req/DepositProfitRequest';
import type { ClaimProfitRequest } from '../../domain/req/ClaimProfitRequest';
import type { ProfitListResponse } from '../../domain/res/ProfitListResponse';
import type { ProfitDetailResponse } from '../../domain/res/ProfitDetailResponse';
import type { ProfitClaimsResponse } from '../../domain/res/ProfitClaimsResponse';
import type { ProfitActionResponse } from '../../domain/res/ProfitActionResponse';
import type { ProfitRepository } from '../interface/ProfitRepository';

export class ProfitRepositoryImpl implements ProfitRepository {
    getProfitPools(): Promise<ProfitListResponse> {
        return get<ProfitListResponse>(API_ROUTES.profits.pools);
    }

    getProfitByProject(request: GetProfitByProjectRequest): Promise<ProfitDetailResponse> {
        return get<ProfitDetailResponse>(API_ROUTES.profits.byProject(request.projectId));
    }

    getProfitByUser(request: GetProfitByUserRequest): Promise<ProfitClaimsResponse> {
        return get<ProfitClaimsResponse>(API_ROUTES.profits.byUser(request.userId));
    }

    depositProfit(request: DepositProfitRequest): Promise<ProfitActionResponse> {
        return post<ProfitActionResponse>(API_ROUTES.profits.deposit, request);
    }

    claimProfit(request: ClaimProfitRequest): Promise<ProfitActionResponse> {
        return post<ProfitActionResponse>(API_ROUTES.profits.claim, request);
    }
}
