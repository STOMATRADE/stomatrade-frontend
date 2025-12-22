import type { GetLandsByFarmerRequest } from '../../domain/req/GetLandsByFarmerRequest';
import type { LandListResponse } from '../../domain/res/LandListResponse';
import type { IGetLandsByFarmer } from '../interface/IGetLandsByFarmer';
import type { LandRepository } from '../../repository/interface/LandRepository';

export class GetLandsByFarmer implements IGetLandsByFarmer {
    constructor(private readonly repository: LandRepository) {}

    async execute(request: GetLandsByFarmerRequest): Promise<LandListResponse> {
        return this.repository.getLandsByFarmer(request);
    }
}