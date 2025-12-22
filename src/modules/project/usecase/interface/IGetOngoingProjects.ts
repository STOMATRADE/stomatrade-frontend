import type { GetProjectsRequest } from '../../domain/req/GetProjectsRequest';
import type { ProjectListResponse } from '../../domain/res/ProjectListResponse';

export interface IGetOngoingProjects {
    execute(request: GetProjectsRequest): Promise<ProjectListResponse>;
}
