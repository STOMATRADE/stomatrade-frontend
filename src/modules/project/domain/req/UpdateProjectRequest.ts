import type { ProjectStatus } from '../entity/ProjectEntity';

export type UpdateProjectRequest = {
    id: string;
    name?: string;
    description?: string;
    status?: ProjectStatus;
};
