import type { ProjectDetailInfoResponse } from '../../domain/res/ProjectDetailInfoResponse';

export interface IGetProjectDetail {
    execute(id: string): Promise<ProjectDetailInfoResponse>;
}
