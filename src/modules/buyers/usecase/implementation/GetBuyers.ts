import type { BuyerListResponse } from '../../domain/res/BuyerListResponse';
import type { GetBuyersUseCase } from '../interface/GetBuyersUseCase';
import type { BuyerRepository } from '../../repository/interface/BuyerRepository';

export class GetBuyers implements GetBuyersUseCase {
    constructor(private readonly repository: BuyerRepository) {}

    execute(): Promise<BuyerListResponse> {
        return this.repository.getAll();
    }
}
