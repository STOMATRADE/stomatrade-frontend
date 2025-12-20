import { useQuery, type UseQueryOptions } from '@tanstack/react-query';
import { AuthRepositoryImpl } from '../repository/implementation/AuthRepositoryImpl';
import { GetAuthProfile } from '../usecase/implementation/GetAuthProfile';
import type { AuthProfileResponse } from '../domain/res/AuthProfileResponse';
import type { ApiError } from '@/core/utils/http/httpClient';

export const authQueryKeys = {
    profile: ['auth', 'profile'] as const,
};

export const useAuthProfileQuery = (
    options?: UseQueryOptions<AuthProfileResponse, ApiError>
) => {
    const repository = new AuthRepositoryImpl();
    const usecase = new GetAuthProfile(repository);

    return useQuery<AuthProfileResponse, ApiError>({
        queryKey: authQueryKeys.profile,
        queryFn: () => usecase.execute(),
        ...options,
    });
};
