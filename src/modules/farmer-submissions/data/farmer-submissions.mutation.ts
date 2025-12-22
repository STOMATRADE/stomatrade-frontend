import { useMutation, type UseMutationOptions } from '@tanstack/react-query';
import type { CreateFarmerSubmissionRequest } from '../domain/req/CreateFarmerSubmissionRequest';
import type { ReviewFarmerSubmissionRequest } from '../domain/req/ReviewFarmerSubmissionRequest';
import type { FarmerSubmissionResponse } from '../domain/res/FarmerSubmissionResponse';
import { FarmerSubmissionRepositoryImpl } from '../repository/implementation/FarmerSubmissionRepositoryImpl';
import { CreateFarmerSubmission } from '../usecase/implementation/CreateFarmerSubmission';
import { ReviewFarmerSubmission } from '../usecase/implementation/ReviewFarmerSubmission';
import { DeleteFarmerSubmission } from '../usecase/implementation/DeleteFarmerSubmission';
import type { ApiError } from '@/core/utils/http/httpClient';

export const farmerSubmissionMutationKeys = {
    create: ['farmer-submissions', 'create'] as const,
    review: ['farmer-submissions', 'review'] as const,
    delete: ['farmer-submissions', 'delete'] as const,
};

export const useCreateFarmerSubmissionMutation = (
    options?: UseMutationOptions<FarmerSubmissionResponse, ApiError, CreateFarmerSubmissionRequest>
) => {
    const repository = new FarmerSubmissionRepositoryImpl();
    const usecase = new CreateFarmerSubmission(repository);

    return useMutation<FarmerSubmissionResponse, ApiError, CreateFarmerSubmissionRequest>({
        mutationKey: farmerSubmissionMutationKeys.create,
        mutationFn: (payload) => usecase.execute(payload),
        ...options,
    });
};

export const useReviewFarmerSubmissionMutation = (
    options?: UseMutationOptions<FarmerSubmissionResponse, ApiError, ReviewFarmerSubmissionRequest>
) => {
    const repository = new FarmerSubmissionRepositoryImpl();
    const usecase = new ReviewFarmerSubmission(repository);

    return useMutation<FarmerSubmissionResponse, ApiError, ReviewFarmerSubmissionRequest>({
        mutationKey: farmerSubmissionMutationKeys.review,
        mutationFn: (payload) => usecase.execute(payload),
        ...options,
    });
};

export const useDeleteFarmerSubmissionMutation = (
    options?: UseMutationOptions<void, ApiError, string>
) => {
    const repository = new FarmerSubmissionRepositoryImpl();
    const usecase = new DeleteFarmerSubmission(repository);

    return useMutation<void, ApiError, string>({
        mutationKey: farmerSubmissionMutationKeys.delete,
        mutationFn: (id) => usecase.execute(id),
        ...options,
    });
};