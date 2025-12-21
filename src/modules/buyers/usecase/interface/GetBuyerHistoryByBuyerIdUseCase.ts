import type { BuyerHistoryResponse } from '../../domain/res/BuyerHistoryResponse';

export interface GetBuyerHistoryByBuyerIdUseCase {
    execute(buyerId: string): Promise<BuyerHistoryResponse>;
}
