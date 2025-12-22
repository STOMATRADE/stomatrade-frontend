import { useMutation, type UseMutationOptions } from '@tanstack/react-query';
import type { DepositProfitRequest } from '../domain/req/DepositProfitRequest';
import type { ClaimProfitRequest } from '../domain/req/ClaimProfitRequest';
import type { ProfitActionResponse } from '../domain/res/ProfitActionResponse';
import { ProfitRepositoryImpl } from '../repository/implementation/ProfitRepositoryImpl';
import { DepositProfit } from '../usecase/implementation/DepositProfit';
import { ClaimProfit } from '../usecase/implementation/ClaimProfit';
import { profitKeys } from './profit.keys';
import type { ApiError } from '@/core/utils/http/httpClient';

export const useDepositProfitMutation = (
    options?: UseMutationOptions<ProfitActionResponse, ApiError, DepositProfitRequest>
) => {
    const repository = new ProfitRepositoryImpl();
    const usecase = new DepositProfit(repository);

    return useMutation<ProfitActionResponse, ApiError, DepositProfitRequest>({
        mutationKey: profitKeys.deposit,
        mutationFn: (payload) => usecase.execute(payload),
        ...options,
    });
};

export const useClaimProfitMutation = (
    options?: UseMutationOptions<ProfitActionResponse, ApiError, ClaimProfitRequest>
) => {
    const repository = new ProfitRepositoryImpl();
    const usecase = new ClaimProfit(repository);

    return useMutation<ProfitActionResponse, ApiError, ClaimProfitRequest>({
        mutationKey: profitKeys.claim,
        mutationFn: (payload) => usecase.execute(payload),
        ...options,
    });
};
