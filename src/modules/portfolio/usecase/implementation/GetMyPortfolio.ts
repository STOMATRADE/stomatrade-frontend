import type { PortfolioListResponse } from '../../domain/res/PortfolioListResponse';
import type { IGetAllPortfolios } from '../interface/IGetMyPortfolio';
import type { PortfolioRepository } from '../../repository/interface/PortfolioRepository';

export class GetMyPortfolio implements IGetAllPortfolios {
    constructor(private readonly repository: PortfolioRepository) { }

    execute(): Promise<PortfolioListResponse> {
        return this.repository.getAllPortfolios();
    }
}
