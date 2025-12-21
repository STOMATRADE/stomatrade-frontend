import type { InvestmentDetailResponse } from '../../domain/res/InvestmentDetailResponse';
import type { IGetInvestmentDetail } from '../interface/IGetInvestmentDetail';
import type { InvestmentRepository } from '../../repository/interface/InvestmentRepository';

export class GetInvestmentDetail implements IGetInvestmentDetail {
    constructor(private readonly repository: InvestmentRepository) {}

    async execute(id: string): Promise<InvestmentDetailResponse> {
        if (!id || id.trim().length === 0) {
            throw new Error('investmentId is required');
        }
        return this.repository.getInvestmentById(id);
    }
}
