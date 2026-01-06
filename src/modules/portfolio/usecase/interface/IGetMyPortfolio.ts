import type { PortfolioListResponse } from '../../domain/res/PortfolioListResponse';

export interface IGetAllPortfolios {
    execute(): Promise<PortfolioListResponse>;
}
