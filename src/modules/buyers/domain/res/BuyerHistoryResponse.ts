import type { BuyerHistoryEntity } from '../entity/BuyerHistoryEntity';

export type BuyerHistoryResponse = {
    data: BuyerHistoryEntity[];
    meta?: {
        page: number;
        limit: number;
        total: number;
    };
};
