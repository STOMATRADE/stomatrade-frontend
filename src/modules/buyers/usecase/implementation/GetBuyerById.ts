import type { BuyerResponse } from '../../domain/res/BuyerResponse';
import type { GetBuyerByIdUseCase } from '../interface/GetBuyerByIdUseCase';
import type { BuyerRepository } from '../../repository/interface/BuyerRepository';

export class GetBuyerById implements GetBuyerByIdUseCase {
    constructor(private readonly repository: BuyerRepository) {}

    async execute(id: string): Promise<BuyerResponse> {
        if (!id || id.trim().length === 0) {
            throw new Error('id is required');
        }
        return this.repository.getById(id);
    }
}
