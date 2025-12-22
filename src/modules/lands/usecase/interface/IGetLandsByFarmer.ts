import type { GetLandsByFarmerRequest } from '../../domain/req/GetLandsByFarmerRequest';
import type { LandListResponse } from '../../domain/res/LandListResponse';

export interface IGetLandsByFarmer {
    execute(request: GetLandsByFarmerRequest): Promise<LandListResponse>;
}