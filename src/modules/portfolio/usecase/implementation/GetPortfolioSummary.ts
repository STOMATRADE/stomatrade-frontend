import type { PortfolioSummaryResponse } from '../../domain/res/PortfolioSummaryResponse';
import type { IGetPortfolioSummary } from '../interface/IGetPortfolioSummary';
import type { PortfolioRepository } from '../../repository/interface/PortfolioRepository';

export class GetPortfolioSummary implements IGetPortfolioSummary {
    constructor(private readonly repository: PortfolioRepository) {}

    execute(): Promise<PortfolioSummaryResponse> {
        return this.repository.getPortfolioSummary();
    }
}
