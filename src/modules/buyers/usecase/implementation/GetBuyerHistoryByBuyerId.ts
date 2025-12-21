import type { BuyerHistoryResponse } from '../../domain/res/BuyerHistoryResponse';
import type { GetBuyerHistoryByBuyerIdUseCase } from '../interface/GetBuyerHistoryByBuyerIdUseCase';
import type { BuyerRepository } from '../../repository/interface/BuyerRepository';

export class GetBuyerHistoryByBuyerId implements GetBuyerHistoryByBuyerIdUseCase {
    constructor(private readonly repository: BuyerRepository) {}

    async execute(buyerId: string): Promise<BuyerHistoryResponse> {
        if (!buyerId || buyerId.trim().length === 0) {
            throw new Error('buyerId is required');
        }
        return this.repository.getHistoryByBuyerId(buyerId);
    }
}
