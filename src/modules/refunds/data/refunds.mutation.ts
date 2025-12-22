import { useMutation, type UseMutationOptions } from '@tanstack/react-query';
import type { MarkRefundableRequest } from '../domain/req/MarkRefundableRequest';
import type { ClaimRefundRequest } from '../domain/req/ClaimRefundRequest';
import type { RefundResponse } from '../domain/res/RefundResponse';
import { RefundRepositoryImpl } from '../repository/implementation/RefundRepositoryImpl';
import { MarkRefundable } from '../usecase/implementation/MarkRefundable';
import { ClaimRefund } from '../usecase/implementation/ClaimRefund';
import type { ApiError } from '@/core/utils/http/httpClient';

export const refundMutationKeys = {
    markRefundable: ['refunds', 'mark-refundable'] as const,
    claim: ['refunds', 'claim'] as const,
};

export const useMarkRefundableMutation = (
    options?: UseMutationOptions<RefundResponse, ApiError, MarkRefundableRequest>
) => {
    const repository = new RefundRepositoryImpl();
    const usecase = new MarkRefundable(repository);

    return useMutation<RefundResponse, ApiError, MarkRefundableRequest>({
        mutationKey: refundMutationKeys.markRefundable,
        mutationFn: (payload) => usecase.execute(payload),
        ...options,
    });
};

export const useClaimRefundMutation = (
    options?: UseMutationOptions<RefundResponse, ApiError, ClaimRefundRequest>
) => {
    const repository = new RefundRepositoryImpl();
    const usecase = new ClaimRefund(repository);

    return useMutation<RefundResponse, ApiError, ClaimRefundRequest>({
        mutationKey: refundMutationKeys.claim,
        mutationFn: (payload) => usecase.execute(payload),
        ...options,
    });
};