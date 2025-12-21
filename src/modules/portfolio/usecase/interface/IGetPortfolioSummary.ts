import type { PortfolioSummaryResponse } from '../../domain/res/PortfolioSummaryResponse';

export interface IGetPortfolioSummary {
    execute(): Promise<PortfolioSummaryResponse>;
}
