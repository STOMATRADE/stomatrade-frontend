import type { GetFarmerSubmissionByIdRequest } from '../../domain/req/GetFarmerSubmissionByIdRequest';
import type { FarmerSubmissionResponse } from '../../domain/res/FarmerSubmissionResponse';

export interface IGetFarmerSubmissionById {
    execute(request: GetFarmerSubmissionByIdRequest): Promise<FarmerSubmissionResponse>;
}