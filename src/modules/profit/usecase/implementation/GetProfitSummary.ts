import type { ProfitSummaryEntity } from '../../domain/entity/ProfitSummaryEntity';
import type { IGetProfitSummary } from '../interface/IGetProfitSummary';
import type { ProfitRepository } from '../../repository/interface/ProfitRepository';

export class GetProfitSummary implements IGetProfitSummary {
    constructor(private readonly repository: ProfitRepository) {}

    execute(): Promise<ProfitSummaryEntity> {
        return this.repository.getProfitSummary();
    }
}
