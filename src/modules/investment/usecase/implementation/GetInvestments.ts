import type { InvestmentListResponse } from '../../domain/res/InvestmentListResponse';
import type { IGetInvestments } from '../interface/IGetInvestments';
import type { InvestmentRepository } from '../../repository/interface/InvestmentRepository';

export class GetInvestments implements IGetInvestments {
    constructor(private readonly repository: InvestmentRepository) {}

    execute(): Promise<InvestmentListResponse> {
        return this.repository.getMyInvestments();
    }
}
