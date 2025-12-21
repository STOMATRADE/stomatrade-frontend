import type { TransactionEntity } from '../entity/TransactionEntity';

export type TransactionListResponse = {
    data: TransactionEntity[];
    meta?: {
        page: number;
        limit: number;
        total: number;
    };
};
