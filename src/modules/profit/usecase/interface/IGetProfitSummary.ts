import type { ProfitSummaryEntity } from '../../domain/entity/ProfitSummaryEntity';

export interface IGetProfitSummary {
    execute(): Promise<ProfitSummaryEntity>;
}
