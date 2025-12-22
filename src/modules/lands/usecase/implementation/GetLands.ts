import type { GetLandsRequest } from '../../domain/req/GetLandsRequest';
import type { LandListResponse } from '../../domain/res/LandListResponse';
import type { IGetLands } from '../interface/IGetLands';
import type { LandRepository } from '../../repository/interface/LandRepository';

export class GetLands implements IGetLands {
    constructor(private readonly repository: LandRepository) {}

    async execute(request: GetLandsRequest): Promise<LandListResponse> {
        return this.repository.getLands(request);
    }
}