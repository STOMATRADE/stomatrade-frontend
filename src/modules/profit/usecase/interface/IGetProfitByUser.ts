import type { GetProfitByUserRequest } from '../../domain/req/GetProfitByUserRequest';
import type { ProfitClaimsResponse } from '../../domain/res/ProfitClaimsResponse';

export interface IGetProfitByUser {
    execute(request: GetProfitByUserRequest): Promise<ProfitClaimsResponse>;
}
