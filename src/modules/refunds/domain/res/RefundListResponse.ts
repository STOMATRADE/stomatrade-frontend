import type { RefundEntity } from '../entity/RefundEntity';

export type RefundListResponse = {
    data: RefundEntity[];
    meta: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
};