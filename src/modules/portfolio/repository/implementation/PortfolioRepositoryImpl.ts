import { get } from '@/core/utils/http/httpClient';
import { API_ROUTES } from '@/core/constant/api';
import type { PortfolioListResponse } from '../../domain/res/PortfolioListResponse';
import type { PortfolioDetailResponse } from '../../domain/res/PortfolioDetailResponse';
import type { PortfolioSummaryResponse } from '../../domain/res/PortfolioSummaryResponse';
import type { PortfolioRepository, PortfolioByProjectRequest } from '../interface/PortfolioRepository';

export class PortfolioRepositoryImpl implements PortfolioRepository {
    getAllPortfolios(): Promise<PortfolioListResponse> {
        return get<PortfolioListResponse>(API_ROUTES.portfolio.root);
    }

    getPortfolioByUserId(userId: string): Promise<PortfolioListResponse> {
        return get<PortfolioListResponse>(API_ROUTES.portfolio.byId(userId));
    }

    getPortfolioByProject(request: PortfolioByProjectRequest): Promise<PortfolioDetailResponse> {
        return get<PortfolioDetailResponse>(API_ROUTES.portfolio.userDetail(request.userId, request.projectId));
    }

    getGlobalStats(): Promise<PortfolioSummaryResponse> {
        return get<PortfolioSummaryResponse>(API_ROUTES.portfolio.stats);
    }

    getTopInvestors(limit?: number): Promise<any> {
        const params = new URLSearchParams();
        if (limit) params.set('limit', String(limit));
        const endpoint = params.toString() ? `${API_ROUTES.portfolio.topInvestors}?${params.toString()}` : API_ROUTES.portfolio.topInvestors;
        return get<any>(endpoint);
    }
}
