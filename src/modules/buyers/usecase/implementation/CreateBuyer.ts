import type { CreateBuyerRequest } from '../../domain/req/CreateBuyerRequest';
import type { BuyerResponse } from '../../domain/res/BuyerResponse';
import type { CreateBuyerUseCase } from '../interface/CreateBuyerUseCase';
import type { BuyerRepository } from '../../repository/interface/BuyerRepository';

export class CreateBuyer implements CreateBuyerUseCase {
    constructor(private readonly repository: BuyerRepository) {}

    async execute(request: CreateBuyerRequest): Promise<BuyerResponse> {
        if (!request.name || request.name.trim().length === 0) {
            throw new Error('name is required');
        }
        return this.repository.create(request);
    }
}
