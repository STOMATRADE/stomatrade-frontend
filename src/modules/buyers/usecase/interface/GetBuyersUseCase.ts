import type { BuyerListResponse } from '../../domain/res/BuyerListResponse';

export interface GetBuyersUseCase {
    execute(): Promise<BuyerListResponse>;
}
