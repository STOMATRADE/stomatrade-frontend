import type { ProfitListResponse } from '../../domain/res/ProfitListResponse';
import type { IGetProfitPools } from '../interface/IGetProfitPools';
import type { ProfitRepository } from '../../repository/interface/ProfitRepository';

export class GetProfitPools implements IGetProfitPools {
    constructor(private readonly repository: ProfitRepository) {}

    execute(): Promise<ProfitListResponse> {
        return this.repository.getProfitPools();
    }
}
