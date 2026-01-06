import { useMutation, type UseMutationOptions } from '@tanstack/react-query';
import type { CreateInvestmentRequest } from '../domain/req/CreateInvestmentRequest';
import type { InvestmentDetailResponse } from '../domain/res/InvestmentDetailResponse';
import { InvestmentRepositoryImpl } from '../repository/implementation/InvestmentRepositoryImpl';
import { CreateInvestment } from '../usecase/implementation/CreateInvestment';
import { RecalculatePortfolio } from '../usecase/implementation/RecalculatePortfolio';
import { DeleteInvestment } from '../usecase/implementation/DeleteInvestment';
import type { ApiError } from '@/core/utils/http/httpClient';

export const investmentMutationKeys = {
    create: ['investments', 'create'] as const,
    recalculate: ['investments', 'recalculate'] as const,
    delete: (id: string) => ['investments', 'delete', id] as const,
};

export const useCreateInvestmentMutation = (
    options?: UseMutationOptions<InvestmentDetailResponse, ApiError, CreateInvestmentRequest>
) => {
    const repository = new InvestmentRepositoryImpl();
    const usecase = new CreateInvestment(repository);

    return useMutation<InvestmentDetailResponse, ApiError, CreateInvestmentRequest>({
        mutationKey: investmentMutationKeys.create,
        mutationFn: (payload: CreateInvestmentRequest) => usecase.execute(payload),
        ...options,
    });
};

export const useRecalculatePortfolioMutation = (
    options?: UseMutationOptions<void, ApiError, void>
) => {
    const repository = new InvestmentRepositoryImpl();
    const usecase = new RecalculatePortfolio(repository);

    return useMutation<void, ApiError, void>({
        mutationKey: investmentMutationKeys.recalculate,
        mutationFn: () => usecase.execute(),
        ...options,
    });
};

export const useDeleteInvestmentMutation = (
    options?: UseMutationOptions<void, ApiError, string>
) => {
    const repository = new InvestmentRepositoryImpl();
    const usecase = new DeleteInvestment(repository);

    return useMutation<void, ApiError, string>({
        mutationKey: investmentMutationKeys.delete(''), // Placeholder key, will be overridden in mutation call if needed, but usually we use a function if it depends on ID
        mutationFn: (id: string) => usecase.execute(id),
        ...options,
    });
};
