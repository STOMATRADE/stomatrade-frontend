import type { ReviewFarmerSubmissionRequest } from '../../domain/req/ReviewFarmerSubmissionRequest';
import type { FarmerSubmissionResponse } from '../../domain/res/FarmerSubmissionResponse';
import type { IReviewFarmerSubmission } from '../interface/IReviewFarmerSubmission';
import type { FarmerSubmissionRepository } from '../../repository/interface/FarmerSubmissionRepository';

export class ReviewFarmerSubmission implements IReviewFarmerSubmission {
    constructor(private readonly repository: FarmerSubmissionRepository) {}

    async execute(request: ReviewFarmerSubmissionRequest): Promise<FarmerSubmissionResponse> {
        return this.repository.updateSubmission(request);
    }
}