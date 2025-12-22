import type { ReviewProjectSubmissionRequest } from '../../domain/req/ReviewProjectSubmissionRequest';
import type { ProjectSubmissionResponse } from '../../domain/res/ProjectSubmissionResponse';

export interface IReviewProjectSubmission {
    execute(request: ReviewProjectSubmissionRequest): Promise<ProjectSubmissionResponse>;
}