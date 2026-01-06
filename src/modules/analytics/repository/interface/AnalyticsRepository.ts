import type { GetAnalyticsRequest } from '../../domain/req/GetAnalyticsRequest';
import type { GrowthAnalyticsResponse } from '../../domain/res/GrowthAnalyticsResponse';

export interface AnalyticsRepository {
    getProjectsGrowth(request: GetAnalyticsRequest): Promise<GrowthAnalyticsResponse>;
    getInvestorsGrowth(request: GetAnalyticsRequest): Promise<GrowthAnalyticsResponse>;
    getUsersGrowth(request: GetAnalyticsRequest): Promise<GrowthAnalyticsResponse>;
}
