import type { GetFarmersRequest } from '../../domain/req/GetFarmersRequest';
import type { FarmerListResponse } from '../../domain/res/FarmerListResponse';

export interface IGetFarmers {
    execute(request: GetFarmersRequest): Promise<FarmerListResponse>;
}
