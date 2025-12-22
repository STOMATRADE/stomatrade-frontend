import type { UpdateLandRequest } from '../../domain/req/UpdateLandRequest';
import type { LandResponse } from '../../domain/res/LandResponse';

export interface IUpdateLand {
    execute(request: UpdateLandRequest): Promise<LandResponse>;
}