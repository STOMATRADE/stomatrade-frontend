import type { ProjectEntity } from '../entity/ProjectEntity';

export type ProjectDetailInfoResponse = {
    project: ProjectEntity;
    [key: string]: unknown;
};
