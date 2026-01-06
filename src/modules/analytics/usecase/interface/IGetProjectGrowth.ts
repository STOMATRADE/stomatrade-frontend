import type { GetAnalyticsRequest } from '../../domain/req/GetAnalyticsRequest';
import type { GrowthAnalyticsResponse } from '../../domain/res/GrowthAnalyticsResponse';

export interface IGetProjectGrowth {
    execute(request: GetAnalyticsRequest): Promise<GrowthAnalyticsResponse>;
}
