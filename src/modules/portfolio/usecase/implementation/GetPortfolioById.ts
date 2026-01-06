import type { PortfolioListResponse } from '../../domain/res/PortfolioListResponse';
import type { IGetPortfolioById } from '../interface/IGetPortfolioById';
import type { PortfolioRepository } from '../../repository/interface/PortfolioRepository';

export class GetPortfolioById implements IGetPortfolioById {
    constructor(private readonly repository: PortfolioRepository) { }

    async execute(userId: string): Promise<PortfolioListResponse> {
        if (!userId || userId.trim().length === 0) {
            throw new Error('userId is required');
        }
        return this.repository.getPortfolioByUserId(userId);
    }
}
