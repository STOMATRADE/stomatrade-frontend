import type { LandEntity } from '../entity/LandEntity';

export type LandListResponse = {
    data: LandEntity[];
    meta: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
};