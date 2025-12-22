import { useMutation, type UseMutationOptions } from '@tanstack/react-query';
import type { CreateNotificationRequest } from '../domain/req/CreateNotificationRequest';
import type { CreateNotificationChannelRequest } from '../domain/req/CreateNotificationChannelRequest';
import type { UpdateNotificationChannelRequest } from '../domain/req/UpdateNotificationChannelRequest';
import type { CreateNotificationTokenRequest } from '../domain/req/CreateNotificationTokenRequest';
import type { NotificationResponse } from '../domain/res/NotificationResponse';
import type { NotificationChannelResponse } from '../domain/res/NotificationChannelResponse';
import type { NotificationTokenResponse } from '../domain/res/NotificationTokenResponse';
import { NotificationRepositoryImpl } from '../repository/implementation/NotificationRepositoryImpl';
import { CreateNotification } from '../usecase/implementation/CreateNotification';
import { CreateNotificationChannel } from '../usecase/implementation/CreateNotificationChannel';
import { UpdateNotificationChannel } from '../usecase/implementation/UpdateNotificationChannel';
import { CreateNotificationToken } from '../usecase/implementation/CreateNotificationToken';
import type { ApiError } from '@/core/utils/http/httpClient';

export const notificationMutationKeys = {
    create: ['notifications', 'create'] as const,
    createChannel: ['notifications', 'channel', 'create'] as const,
    updateChannel: ['notifications', 'channel', 'update'] as const,
    createToken: ['notifications', 'token', 'create'] as const,
};

export const useCreateNotificationMutation = (
    options?: UseMutationOptions<NotificationResponse, ApiError, CreateNotificationRequest>
) => {
    const repository = new NotificationRepositoryImpl();
    const usecase = new CreateNotification(repository);

    return useMutation<NotificationResponse, ApiError, CreateNotificationRequest>({
        mutationKey: notificationMutationKeys.create,
        mutationFn: (payload) => usecase.execute(payload),
        ...options,
    });
};

export const useCreateNotificationChannelMutation = (
    options?: UseMutationOptions<NotificationChannelResponse, ApiError, CreateNotificationChannelRequest>
) => {
    const repository = new NotificationRepositoryImpl();
    const usecase = new CreateNotificationChannel(repository);

    return useMutation<NotificationChannelResponse, ApiError, CreateNotificationChannelRequest>({
        mutationKey: notificationMutationKeys.createChannel,
        mutationFn: (payload) => usecase.execute(payload),
        ...options,
    });
};

export const useUpdateNotificationChannelMutation = (
    options?: UseMutationOptions<NotificationChannelResponse, ApiError, UpdateNotificationChannelRequest>
) => {
    const repository = new NotificationRepositoryImpl();
    const usecase = new UpdateNotificationChannel(repository);

    return useMutation<NotificationChannelResponse, ApiError, UpdateNotificationChannelRequest>({
        mutationKey: notificationMutationKeys.updateChannel,
        mutationFn: (payload) => usecase.execute(payload),
        ...options,
    });
};

export const useCreateNotificationTokenMutation = (
    options?: UseMutationOptions<NotificationTokenResponse, ApiError, CreateNotificationTokenRequest>
) => {
    const repository = new NotificationRepositoryImpl();
    const usecase = new CreateNotificationToken(repository);

    return useMutation<NotificationTokenResponse, ApiError, CreateNotificationTokenRequest>({
        mutationKey: notificationMutationKeys.createToken,
        mutationFn: (payload) => usecase.execute(payload),
        ...options,
    });
};