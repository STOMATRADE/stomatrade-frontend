import type { PortfolioListResponse } from '../../domain/res/PortfolioListResponse';

export interface IGetMyPortfolio {
    execute(): Promise<PortfolioListResponse>;
}
