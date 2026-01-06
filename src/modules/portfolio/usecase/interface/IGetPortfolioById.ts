import type { PortfolioListResponse } from '../../domain/res/PortfolioListResponse';

export interface IGetPortfolioById {
    execute(userId: string): Promise<PortfolioListResponse>;
}
