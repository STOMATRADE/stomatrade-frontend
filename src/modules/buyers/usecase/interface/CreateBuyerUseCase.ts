import type { CreateBuyerRequest } from '../../domain/req/CreateBuyerRequest';
import type { BuyerResponse } from '../../domain/res/BuyerResponse';

export interface CreateBuyerUseCase {
    execute(request: CreateBuyerRequest): Promise<BuyerResponse>;
}
