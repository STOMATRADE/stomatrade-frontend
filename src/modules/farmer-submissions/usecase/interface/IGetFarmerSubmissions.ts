import type { GetFarmerSubmissionsRequest } from '../../domain/req/GetFarmerSubmissionsRequest';
import type { FarmerSubmissionListResponse } from '../../domain/res/FarmerSubmissionListResponse';

export interface IGetFarmerSubmissions {
    execute(request: GetFarmerSubmissionsRequest): Promise<FarmerSubmissionListResponse>;
}