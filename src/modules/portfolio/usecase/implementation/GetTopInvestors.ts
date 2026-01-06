import type { PortfolioRepository } from '../../repository/interface/PortfolioRepository';
import type { IGetTopInvestors } from '../interface/IGetTopInvestors';

export class GetTopInvestors implements IGetTopInvestors {
    constructor(private readonly repository: PortfolioRepository) { }

    async execute(limit?: number): Promise<any> {
        return this.repository.getTopInvestors(limit);
    }
}
