import { get } from '@/core/utils/http/httpClient';
import { API_ROUTES } from '@/core/constant/api';
import type { GetAnalyticsRequest } from '../../domain/req/GetAnalyticsRequest';
import type { GrowthAnalyticsResponse } from '../../domain/res/GrowthAnalyticsResponse';
import type { AnalyticsRepository } from '../interface/AnalyticsRepository';

export class AnalyticsRepositoryImpl implements AnalyticsRepository {
    private buildEndpoint(baseUrl: string, request: GetAnalyticsRequest): string {
        const params = new URLSearchParams();
        params.set('period', request.period);
        if (request.limit !== undefined) params.set('limit', String(request.limit));
        if (request.startDate) params.set('startDate', request.startDate);
        if (request.endDate) params.set('endDate', request.endDate);

        return `${baseUrl}?${params.toString()}`;
    }

    getProjectsGrowth(request: GetAnalyticsRequest): Promise<GrowthAnalyticsResponse> {
        return get<GrowthAnalyticsResponse>(this.buildEndpoint(API_ROUTES.analytics.projectsGrowth, request));
    }

    getInvestorsGrowth(request: GetAnalyticsRequest): Promise<GrowthAnalyticsResponse> {
        return get<GrowthAnalyticsResponse>(this.buildEndpoint(API_ROUTES.analytics.investorsGrowth, request));
    }

    getUsersGrowth(request: GetAnalyticsRequest): Promise<GrowthAnalyticsResponse> {
        return get<GrowthAnalyticsResponse>(this.buildEndpoint(API_ROUTES.analytics.usersGrowth, request));
    }
}
