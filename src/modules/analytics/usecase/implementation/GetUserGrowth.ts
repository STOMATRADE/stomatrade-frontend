import type { GetAnalyticsRequest } from '../../domain/req/GetAnalyticsRequest';
import type { GrowthAnalyticsResponse } from '../../domain/res/GrowthAnalyticsResponse';
import type { AnalyticsRepository } from '../../repository/interface/AnalyticsRepository';
import type { IGetUserGrowth } from '../interface/IGetUserGrowth';

export class GetUserGrowth implements IGetUserGrowth {
    constructor(private readonly repository: AnalyticsRepository) { }

    async execute(request: GetAnalyticsRequest): Promise<GrowthAnalyticsResponse> {
        return this.repository.getUsersGrowth(request);
    }
}
