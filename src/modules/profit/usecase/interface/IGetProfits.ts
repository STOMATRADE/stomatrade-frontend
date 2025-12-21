import type { ProfitListResponse } from '../../domain/res/ProfitListResponse';

export interface IGetProfits {
    execute(): Promise<ProfitListResponse>;
}
