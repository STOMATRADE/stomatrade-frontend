import { useQuery, type UseQueryOptions } from '@tanstack/react-query';
import type { GetNotificationsRequest } from '../domain/req/GetNotificationsRequest';
import type { GetNotificationByIdRequest } from '../domain/req/GetNotificationByIdRequest';
import type { NotificationListResponse } from '../domain/res/NotificationListResponse';
import type { NotificationResponse } from '../domain/res/NotificationResponse';
import { NotificationRepositoryImpl } from '../repository/implementation/NotificationRepositoryImpl';
import { GetNotifications } from '../usecase/implementation/GetNotifications';
import { GetNotificationById } from '../usecase/implementation/GetNotificationById';
import type { ApiError } from '@/core/utils/http/httpClient';

export const notificationQueryKeys = {
    list: (params: GetNotificationsRequest) => ['notifications', 'list', params] as const,
    detail: (id: string) => ['notifications', 'detail', id] as const,
    channels: (params: GetNotificationsRequest) => ['notifications', 'channels', params] as const,
    tokens: (userId: string, params: GetNotificationsRequest) => ['notifications', 'tokens', userId, params] as const,
};

export const useNotificationsQuery = (
    params: GetNotificationsRequest,
    options?: UseQueryOptions<NotificationListResponse, ApiError>
) => {
    const repository = new NotificationRepositoryImpl();
    const usecase = new GetNotifications(repository);

    return useQuery<NotificationListResponse, ApiError>({
        queryKey: notificationQueryKeys.list(params),
        queryFn: () => usecase.execute(params),
        ...options,
    });
};

export const useNotificationDetailQuery = (
    params: GetNotificationByIdRequest,
    options?: UseQueryOptions<NotificationResponse, ApiError>
) => {
    const repository = new NotificationRepositoryImpl();
    const usecase = new GetNotificationById(repository);

    return useQuery<NotificationResponse, ApiError>({
        queryKey: notificationQueryKeys.detail(params.id),
        queryFn: () => usecase.execute(params),
        ...options,
    });
};