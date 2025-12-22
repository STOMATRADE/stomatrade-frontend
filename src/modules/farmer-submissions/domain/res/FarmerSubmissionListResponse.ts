import type { FarmerSubmissionEntity } from '../entity/FarmerSubmissionEntity';

export type FarmerSubmissionListResponse = {
    data: FarmerSubmissionEntity[];
    meta: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
};