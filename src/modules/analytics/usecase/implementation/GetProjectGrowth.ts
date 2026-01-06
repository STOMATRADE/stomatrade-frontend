import type { GetAnalyticsRequest } from '../../domain/req/GetAnalyticsRequest';
import type { GrowthAnalyticsResponse } from '../../domain/res/GrowthAnalyticsResponse';
import type { AnalyticsRepository } from '../../repository/interface/AnalyticsRepository';
import type { IGetProjectGrowth } from '../interface/IGetProjectGrowth';

export class GetProjectGrowth implements IGetProjectGrowth {
    constructor(private readonly repository: AnalyticsRepository) { }

    async execute(request: GetAnalyticsRequest): Promise<GrowthAnalyticsResponse> {
        return this.repository.getProjectsGrowth(request);
    }
}
