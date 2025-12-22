import type { GetLandsRequest } from '../../domain/req/GetLandsRequest';
import type { LandListResponse } from '../../domain/res/LandListResponse';

export interface IGetLands {
    execute(request: GetLandsRequest): Promise<LandListResponse>;
}