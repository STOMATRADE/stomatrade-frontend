import type { CreateBuyerHistoryRequest } from '../../domain/req/CreateBuyerHistoryRequest';
import type { BuyerHistoryResponse } from '../../domain/res/BuyerHistoryResponse';

export interface CreateBuyerHistoryUseCase {
    execute(request: CreateBuyerHistoryRequest): Promise<BuyerHistoryResponse>;
}
