import type { GetLandByIdRequest } from '../../domain/req/GetLandByIdRequest';
import type { LandResponse } from '../../domain/res/LandResponse';

export interface IGetLandById {
    execute(request: GetLandByIdRequest): Promise<LandResponse>;
}