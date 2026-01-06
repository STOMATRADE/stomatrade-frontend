import type { PortfolioListResponse } from '../../domain/res/PortfolioListResponse';
import type { PortfolioDetailResponse } from '../../domain/res/PortfolioDetailResponse';
import type { PortfolioSummaryResponse } from '../../domain/res/PortfolioSummaryResponse';

export type PortfolioByProjectRequest = {
    userId: string;
    projectId: string;
};

export interface PortfolioRepository {
    getAllPortfolios(): Promise<PortfolioListResponse>;
    getPortfolioByUserId(userId: string): Promise<PortfolioListResponse>;
    getPortfolioByProject(request: PortfolioByProjectRequest): Promise<PortfolioDetailResponse>;
    getGlobalStats(): Promise<PortfolioSummaryResponse>;
    getTopInvestors(limit?: number): Promise<any>;
}
