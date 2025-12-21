import { get } from '@/core/utils/http/httpClient';
import { API_ROUTES } from '@/core/constant/api';
import type { GetPortfolioByIdRequest } from '../../domain/req/GetPortfolioByIdRequest';
import type { PortfolioListResponse } from '../../domain/res/PortfolioListResponse';
import type { PortfolioDetailResponse } from '../../domain/res/PortfolioDetailResponse';
import type { PortfolioSummaryResponse } from '../../domain/res/PortfolioSummaryResponse';
import type { PortfolioRepository } from '../interface/PortfolioRepository';

export class PortfolioRepositoryImpl implements PortfolioRepository {
    getMyPortfolio(): Promise<PortfolioListResponse> {
        return get<PortfolioListResponse>(API_ROUTES.portfolio.root);
    }

    getPortfolioById(request: GetPortfolioByIdRequest): Promise<PortfolioDetailResponse> {
        return get<PortfolioDetailResponse>(API_ROUTES.portfolio.byId(request.portfolioId));
    }

    getPortfolioSummary(): Promise<PortfolioSummaryResponse> {
        return get<PortfolioSummaryResponse>(API_ROUTES.portfolio.summary);
    }
}
