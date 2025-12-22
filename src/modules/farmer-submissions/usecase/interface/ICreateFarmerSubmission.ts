import type { CreateFarmerSubmissionRequest } from '../../domain/req/CreateFarmerSubmissionRequest';
import type { FarmerSubmissionResponse } from '../../domain/res/FarmerSubmissionResponse';

export interface ICreateFarmerSubmission {
    execute(request: CreateFarmerSubmissionRequest): Promise<FarmerSubmissionResponse>;
}