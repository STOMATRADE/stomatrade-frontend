import type { FarmerEntity } from '../entity/FarmerEntity';

export type FarmerListResponse = {
    data: FarmerEntity[];
    meta?: Record<string, unknown>;
};
