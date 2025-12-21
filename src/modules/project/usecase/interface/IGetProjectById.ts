import type { ProjectDetailResponse } from '../../domain/res/ProjectDetailResponse';

export interface IGetProjectById {
    execute(id: string): Promise<ProjectDetailResponse>;
}
