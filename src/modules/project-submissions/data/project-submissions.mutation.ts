import { useMutation, type UseMutationOptions } from '@tanstack/react-query';
import type { CreateProjectSubmissionRequest } from '../domain/req/CreateProjectSubmissionRequest';
import type { ReviewProjectSubmissionRequest } from '../domain/req/ReviewProjectSubmissionRequest';
import type { ProjectSubmissionResponse } from '../domain/res/ProjectSubmissionResponse';
import { ProjectSubmissionRepositoryImpl } from '../repository/implementation/ProjectSubmissionRepositoryImpl';
import { CreateProjectSubmission } from '../usecase/implementation/CreateProjectSubmission';
import { ReviewProjectSubmission } from '../usecase/implementation/ReviewProjectSubmission';
import { DeleteProjectSubmission } from '../usecase/implementation/DeleteProjectSubmission';
import type { ApiError } from '@/core/utils/http/httpClient';

export const projectSubmissionMutationKeys = {
    create: ['project-submissions', 'create'] as const,
    review: ['project-submissions', 'review'] as const,
    delete: ['project-submissions', 'delete'] as const,
};

export const useCreateProjectSubmissionMutation = (
    options?: UseMutationOptions<ProjectSubmissionResponse, ApiError, CreateProjectSubmissionRequest>
) => {
    const repository = new ProjectSubmissionRepositoryImpl();
    const usecase = new CreateProjectSubmission(repository);

    return useMutation<ProjectSubmissionResponse, ApiError, CreateProjectSubmissionRequest>({
        mutationKey: projectSubmissionMutationKeys.create,
        mutationFn: (payload) => usecase.execute(payload),
        ...options,
    });
};

export const useReviewProjectSubmissionMutation = (
    options?: UseMutationOptions<ProjectSubmissionResponse, ApiError, ReviewProjectSubmissionRequest>
) => {
    const repository = new ProjectSubmissionRepositoryImpl();
    const usecase = new ReviewProjectSubmission(repository);

    return useMutation<ProjectSubmissionResponse, ApiError, ReviewProjectSubmissionRequest>({
        mutationKey: projectSubmissionMutationKeys.review,
        mutationFn: (payload) => usecase.execute(payload),
        ...options,
    });
};

export const useDeleteProjectSubmissionMutation = (
    options?: UseMutationOptions<void, ApiError, string>
) => {
    const repository = new ProjectSubmissionRepositoryImpl();
    const usecase = new DeleteProjectSubmission(repository);

    return useMutation<void, ApiError, string>({
        mutationKey: projectSubmissionMutationKeys.delete,
        mutationFn: (id) => usecase.execute(id),
        ...options,
    });
};