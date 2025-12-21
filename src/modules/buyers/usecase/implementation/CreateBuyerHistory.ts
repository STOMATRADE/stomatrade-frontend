import type { CreateBuyerHistoryRequest } from '../../domain/req/CreateBuyerHistoryRequest';
import type { BuyerHistoryResponse } from '../../domain/res/BuyerHistoryResponse';
import type { CreateBuyerHistoryUseCase } from '../interface/CreateBuyerHistoryUseCase';
import type { BuyerRepository } from '../../repository/interface/BuyerRepository';

export class CreateBuyerHistory implements CreateBuyerHistoryUseCase {
    constructor(private readonly repository: BuyerRepository) {}

    async execute(request: CreateBuyerHistoryRequest): Promise<BuyerHistoryResponse> {
        if (!request.buyerId || request.buyerId.trim().length === 0) {
            throw new Error('buyerId is required');
        }
        if (!request.action || request.action.trim().length === 0) {
            throw new Error('action is required');
        }
        return this.repository.createHistory(request);
    }
}
