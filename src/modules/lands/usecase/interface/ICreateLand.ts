import type { CreateLandRequest } from '../../domain/req/CreateLandRequest';
import type { LandResponse } from '../../domain/res/LandResponse';

export interface ICreateLand {
    execute(request: CreateLandRequest): Promise<LandResponse>;
}