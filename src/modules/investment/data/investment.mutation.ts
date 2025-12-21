import { useMutation, type UseMutationOptions } from '@tanstack/react-query';
import type { CreateInvestmentRequest } from '../domain/req/CreateInvestmentRequest';
import type { InvestmentDetailResponse } from '../domain/res/InvestmentDetailResponse';
import { InvestmentRepositoryImpl } from '../repository/implementation/InvestmentRepositoryImpl';
import { CreateInvestment } from '../usecase/implementation/CreateInvestment';
import type { ApiError } from '@/core/utils/http/httpClient';

export const investmentMutationKeys = {
    create: ['investments', 'create'] as const,
};

export const useCreateInvestmentMutation = (
    options?: UseMutationOptions<InvestmentDetailResponse, ApiError, CreateInvestmentRequest>
) => {
    const repository = new InvestmentRepositoryImpl();
    const usecase = new CreateInvestment(repository);

    return useMutation<InvestmentDetailResponse, ApiError, CreateInvestmentRequest>({
        mutationKey: investmentMutationKeys.create,
        mutationFn: (payload) => usecase.execute(payload),
        ...options,
    });
};
