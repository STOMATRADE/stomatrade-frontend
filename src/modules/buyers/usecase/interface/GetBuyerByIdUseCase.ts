import type { BuyerResponse } from '../../domain/res/BuyerResponse';

export interface GetBuyerByIdUseCase {
    execute(id: string): Promise<BuyerResponse>;
}
