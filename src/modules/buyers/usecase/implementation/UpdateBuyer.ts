import type { UpdateBuyerRequest } from '../../domain/req/UpdateBuyerRequest';
import type { BuyerResponse } from '../../domain/res/BuyerResponse';
import type { UpdateBuyerUseCase } from '../interface/UpdateBuyerUseCase';
import type { BuyerRepository } from '../../repository/interface/BuyerRepository';

export class UpdateBuyer implements UpdateBuyerUseCase {
    constructor(private readonly repository: BuyerRepository) {}

    async execute(request: UpdateBuyerRequest): Promise<BuyerResponse> {
        if (!request.id || request.id.trim().length === 0) {
            throw new Error('id is required');
        }
        return this.repository.update(request.id, request);
    }
}
