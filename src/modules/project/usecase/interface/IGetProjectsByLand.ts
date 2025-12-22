import type { GetProjectsByLandRequest } from '../../domain/req/GetProjectsByLandRequest';
import type { ProjectListResponse } from '../../domain/res/ProjectListResponse';

export interface IGetProjectsByLand {
    execute(request: GetProjectsByLandRequest): Promise<ProjectListResponse>;
}
