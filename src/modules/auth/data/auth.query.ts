import { useQuery, type UseQueryOptions } from '@tanstack/react-query';
import { AuthRepositoryImpl } from '../repository/implementation/AuthRepositoryImpl';
import { GetAuthProfile } from '../usecase/implementation/GetAuthProfile';
import type { AuthProfileResponse } from '../domain/res/AuthProfileResponse';
import type { ApiError } from '@/core/utils/http/httpClient';

export const authQueryKeys = {
    profile: ['auth', 'profile'] as const,
    me: ['auth', 'me'] as const,
};

type AuthProfileQueryOptions = Omit<
    UseQueryOptions<AuthProfileResponse, ApiError>,
    'queryKey' | 'queryFn'
>;

export const useAuthProfileQuery = (options?: AuthProfileQueryOptions) => {
    const repository = new AuthRepositoryImpl();
    const usecase = new GetAuthProfile(repository);

    return useQuery<AuthProfileResponse, ApiError>({
        queryKey: authQueryKeys.profile,
        queryFn: () => usecase.execute(),
        retry: (failureCount, error) => {
            if (error?.status === 401) return false;
            return failureCount < 1;
        },
        staleTime: 30_000,
        ...options,
    });
};
