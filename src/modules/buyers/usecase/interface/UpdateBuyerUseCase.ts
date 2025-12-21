import type { UpdateBuyerRequest } from '../../domain/req/UpdateBuyerRequest';
import type { BuyerResponse } from '../../domain/res/BuyerResponse';

export interface UpdateBuyerUseCase {
    execute(request: UpdateBuyerRequest): Promise<BuyerResponse>;
}
