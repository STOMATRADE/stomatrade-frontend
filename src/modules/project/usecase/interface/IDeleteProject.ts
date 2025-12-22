import type { ProjectDetailResponse } from '../../domain/res/ProjectDetailResponse';

export interface IDeleteProject {
    execute(id: string): Promise<ProjectDetailResponse>;
}
