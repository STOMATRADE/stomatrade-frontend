import type { GetProfitByProjectRequest } from '../../domain/req/GetProfitByProjectRequest';
import type { ProfitDetailResponse } from '../../domain/res/ProfitDetailResponse';

export interface IGetProfitByProject {
    execute(request: GetProfitByProjectRequest): Promise<ProfitDetailResponse>;
}
