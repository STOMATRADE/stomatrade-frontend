import type { InvestmentRepository } from '../../repository/interface/InvestmentRepository';
import type { IRecalculatePortfolio } from '../interface/IRecalculatePortfolio';

export class RecalculatePortfolio implements IRecalculatePortfolio {
    constructor(private readonly repository: InvestmentRepository) { }

    async execute(): Promise<void> {
        return this.repository.recalculatePortfolio();
    }
}
