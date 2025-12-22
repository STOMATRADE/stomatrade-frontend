import type { GetLandByIdRequest } from '../../domain/req/GetLandByIdRequest';
import type { LandResponse } from '../../domain/res/LandResponse';
import type { IGetLandById } from '../interface/IGetLandById';
import type { LandRepository } from '../../repository/interface/LandRepository';

export class GetLandById implements IGetLandById {
    constructor(private readonly repository: LandRepository) {}

    async execute(request: GetLandByIdRequest): Promise<LandResponse> {
        return this.repository.getLandById(request);
    }
}