import type { ProfitListResponse } from '../../domain/res/ProfitListResponse';
import type { IGetProfits } from '../interface/IGetProfits';
import type { ProfitRepository } from '../../repository/interface/ProfitRepository';

export class GetProfits implements IGetProfits {
    constructor(private readonly repository: ProfitRepository) {}

    execute(): Promise<ProfitListResponse> {
        return this.repository.getProfits();
    }
}
