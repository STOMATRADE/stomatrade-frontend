import type { GetPortfolioByIdRequest } from '../../domain/req/GetPortfolioByIdRequest';
import type { PortfolioListResponse } from '../../domain/res/PortfolioListResponse';
import type { PortfolioDetailResponse } from '../../domain/res/PortfolioDetailResponse';
import type { PortfolioSummaryResponse } from '../../domain/res/PortfolioSummaryResponse';

export interface PortfolioRepository {
    getMyPortfolio(): Promise<PortfolioListResponse>;
    getPortfolioById(request: GetPortfolioByIdRequest): Promise<PortfolioDetailResponse>;
    getPortfolioSummary(): Promise<PortfolioSummaryResponse>;
}
