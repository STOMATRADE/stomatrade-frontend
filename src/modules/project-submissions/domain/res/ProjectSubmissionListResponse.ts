import type { ProjectSubmissionEntity } from '../entity/ProjectSubmissionEntity';

export type ProjectSubmissionListResponse = {
    data: ProjectSubmissionEntity[];
    meta: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
};