import type { ReviewFarmerSubmissionRequest } from '../../domain/req/ReviewFarmerSubmissionRequest';
import type { FarmerSubmissionResponse } from '../../domain/res/FarmerSubmissionResponse';

export interface IReviewFarmerSubmission {
    execute(request: ReviewFarmerSubmissionRequest): Promise<FarmerSubmissionResponse>;
}