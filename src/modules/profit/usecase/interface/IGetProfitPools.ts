import type { ProfitListResponse } from '../../domain/res/ProfitListResponse';

export interface IGetProfitPools {
    execute(): Promise<ProfitListResponse>;
}
