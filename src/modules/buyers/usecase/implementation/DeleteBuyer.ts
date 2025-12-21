import type { DeleteBuyerUseCase } from '../interface/DeleteBuyerUseCase';
import type { BuyerRepository } from '../../repository/interface/BuyerRepository';

export class DeleteBuyer implements DeleteBuyerUseCase {
    constructor(private readonly repository: BuyerRepository) {}

    async execute(id: string): Promise<void> {
        if (!id || id.trim().length === 0) {
            throw new Error('id is required');
        }
        return this.repository.delete(id);
    }
}
