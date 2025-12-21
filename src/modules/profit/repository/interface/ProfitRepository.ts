import type { ProfitListResponse } from '../../domain/res/ProfitListResponse';
import type { ProfitDetailResponse } from '../../domain/res/ProfitDetailResponse';
import type { ProfitSummaryEntity } from '../../domain/entity/ProfitSummaryEntity';

export interface ProfitRepository {
    getProfits(): Promise<ProfitListResponse>;
    getProfitById(id: string): Promise<ProfitDetailResponse>;
    getProfitByInvestment(investmentId: string): Promise<ProfitListResponse>;
    getProfitSummary(): Promise<ProfitSummaryEntity>;
}
