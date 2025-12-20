import type { GetFarmersByCollectorRequest } from '../../domain/req/GetFarmersByCollectorRequest';
import type { FarmerListResponse } from '../../domain/res/FarmerListResponse';

export interface IGetFarmersByCollector {
    execute(request: GetFarmersByCollectorRequest): Promise<FarmerListResponse>;
}
