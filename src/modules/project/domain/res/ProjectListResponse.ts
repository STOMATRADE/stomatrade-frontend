import type { ProjectEntity } from '../entity/ProjectEntity';

export type ProjectListMeta = {
    total: number;
    page: number;
    limit: number;
    totalPages?: number;
};

export type ProjectListResponse = {
    items: ProjectEntity[];
    meta: ProjectListMeta;
};
