import type { InvestmentRepository } from '../../repository/interface/InvestmentRepository';
import type { IDeleteInvestment } from '../interface/IDeleteInvestment';

export class DeleteInvestment implements IDeleteInvestment {
    constructor(private readonly repository: InvestmentRepository) { }

    async execute(id: string): Promise<void> {
        return this.repository.deleteInvestment(id);
    }
}
