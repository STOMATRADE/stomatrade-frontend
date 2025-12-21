import type { GetPortfolioByIdRequest } from '../../domain/req/GetPortfolioByIdRequest';
import type { PortfolioDetailResponse } from '../../domain/res/PortfolioDetailResponse';
import type { IGetPortfolioById } from '../interface/IGetPortfolioById';
import type { PortfolioRepository } from '../../repository/interface/PortfolioRepository';

export class GetPortfolioById implements IGetPortfolioById {
    constructor(private readonly repository: PortfolioRepository) {}

    async execute(request: GetPortfolioByIdRequest): Promise<PortfolioDetailResponse> {
        if (!request.portfolioId || request.portfolioId.trim().length === 0) {
            throw new Error('portfolioId is required');
        }
        return this.repository.getPortfolioById(request);
    }
}
