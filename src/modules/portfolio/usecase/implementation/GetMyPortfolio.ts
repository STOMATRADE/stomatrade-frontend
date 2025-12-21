import type { PortfolioListResponse } from '../../domain/res/PortfolioListResponse';
import type { IGetMyPortfolio } from '../interface/IGetMyPortfolio';
import type { PortfolioRepository } from '../../repository/interface/PortfolioRepository';

export class GetMyPortfolio implements IGetMyPortfolio {
    constructor(private readonly repository: PortfolioRepository) {}

    execute(): Promise<PortfolioListResponse> {
        return this.repository.getMyPortfolio();
    }
}
