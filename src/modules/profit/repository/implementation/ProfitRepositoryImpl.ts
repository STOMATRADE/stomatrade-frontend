import { get } from '@/core/utils/http/httpClient';
import { API_ROUTES } from '@/core/constant/api';
import type { ProfitListResponse } from '../../domain/res/ProfitListResponse';
import type { ProfitDetailResponse } from '../../domain/res/ProfitDetailResponse';
import type { ProfitSummaryEntity } from '../../domain/entity/ProfitSummaryEntity';
import type { ProfitRepository } from '../interface/ProfitRepository';

export class ProfitRepositoryImpl implements ProfitRepository {
    getProfits(): Promise<ProfitListResponse> {
        return get<ProfitListResponse>(API_ROUTES.profits.root);
    }

    getProfitById(id: string): Promise<ProfitDetailResponse> {
        return get<ProfitDetailResponse>(API_ROUTES.profits.byId(id));
    }

    getProfitByInvestment(investmentId: string): Promise<ProfitListResponse> {
        return get<ProfitListResponse>(API_ROUTES.profits.byInvestment(investmentId));
    }

    getProfitSummary(): Promise<ProfitSummaryEntity> {
        return get<ProfitSummaryEntity>(API_ROUTES.profits.summary);
    }
}
