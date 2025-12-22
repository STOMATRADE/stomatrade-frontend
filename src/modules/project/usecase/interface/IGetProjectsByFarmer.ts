import type { GetProjectsByFarmerRequest } from '../../domain/req/GetProjectsByFarmerRequest';
import type { ProjectListResponse } from '../../domain/res/ProjectListResponse';

export interface IGetProjectsByFarmer {
    execute(request: GetProjectsByFarmerRequest): Promise<ProjectListResponse>;
}
