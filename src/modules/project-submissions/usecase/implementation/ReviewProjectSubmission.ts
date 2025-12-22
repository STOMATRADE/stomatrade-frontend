import type { ReviewProjectSubmissionRequest } from '../../domain/req/ReviewProjectSubmissionRequest';
import type { ProjectSubmissionResponse } from '../../domain/res/ProjectSubmissionResponse';
import type { IReviewProjectSubmission } from '../interface/IReviewProjectSubmission';
import type { ProjectSubmissionRepository } from '../../repository/interface/ProjectSubmissionRepository';

export class ReviewProjectSubmission implements IReviewProjectSubmission {
    constructor(private readonly repository: ProjectSubmissionRepository) {}

    async execute(request: ReviewProjectSubmissionRequest): Promise<ProjectSubmissionResponse> {
        return this.repository.updateSubmission(request);
    }
}