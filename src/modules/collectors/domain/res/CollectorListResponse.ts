import type { CollectorEntity } from '../entity/CollectorEntity';

export type CollectorListResponse = {
    data: CollectorEntity[];
    meta?: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
};
