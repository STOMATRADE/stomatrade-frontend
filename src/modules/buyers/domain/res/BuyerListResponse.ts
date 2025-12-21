import type { BuyerEntity } from '../entity/BuyerEntity';

export type BuyerListResponse = {
    data: BuyerEntity[];
    meta?: {
        page: number;
        limit: number;
        total: number;
    };
};
