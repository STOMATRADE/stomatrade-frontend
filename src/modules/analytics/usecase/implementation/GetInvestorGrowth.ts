import type { GetAnalyticsRequest } from '../../domain/req/GetAnalyticsRequest';
import type { GrowthAnalyticsResponse } from '../../domain/res/GrowthAnalyticsResponse';
import type { AnalyticsRepository } from '../../repository/interface/AnalyticsRepository';
import type { IGetInvestorGrowth } from '../interface/IGetInvestorGrowth';

export class GetInvestorGrowth implements IGetInvestorGrowth {
    constructor(private readonly repository: AnalyticsRepository) { }

    async execute(request: GetAnalyticsRequest): Promise<GrowthAnalyticsResponse> {
        return this.repository.getInvestorsGrowth(request);
    }
}
