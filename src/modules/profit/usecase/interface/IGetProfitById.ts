import type { ProfitDetailResponse } from '../../domain/res/ProfitDetailResponse';

export interface IGetProfitById {
    execute(id: string): Promise<ProfitDetailResponse>;
}
