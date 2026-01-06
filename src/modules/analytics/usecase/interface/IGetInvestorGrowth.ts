import type { GetAnalyticsRequest } from '../../domain/req/GetAnalyticsRequest';
import type { GrowthAnalyticsResponse } from '../../domain/res/GrowthAnalyticsResponse';

export interface IGetInvestorGrowth {
    execute(request: GetAnalyticsRequest): Promise<GrowthAnalyticsResponse>;
}
