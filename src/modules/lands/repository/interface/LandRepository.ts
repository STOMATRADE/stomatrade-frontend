import type { CreateLandRequest } from '../../domain/req/CreateLandRequest';
import type { UpdateLandRequest } from '../../domain/req/UpdateLandRequest';
import type { GetLandsRequest } from '../../domain/req/GetLandsRequest';
import type { GetLandByIdRequest } from '../../domain/req/GetLandByIdRequest';
import type { GetLandsByFarmerRequest } from '../../domain/req/GetLandsByFarmerRequest';
import type { LandResponse } from '../../domain/res/LandResponse';
import type { LandListResponse } from '../../domain/res/LandListResponse';

export interface LandRepository {
    createLand(request: CreateLandRequest): Promise<LandResponse>;
    getLands(request: GetLandsRequest): Promise<LandListResponse>;
    getLandById(request: GetLandByIdRequest): Promise<LandResponse>;
    getLandsByFarmer(request: GetLandsByFarmerRequest): Promise<LandListResponse>;
    updateLand(request: UpdateLandRequest): Promise<LandResponse>;
    deleteLand(id: string): Promise<void>;
}