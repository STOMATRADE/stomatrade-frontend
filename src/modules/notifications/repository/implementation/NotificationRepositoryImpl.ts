import { get, post, patch, del } from '@/core/utils/http/httpClient';
import { API_ROUTES } from '@/core/constant/api';
import type { CreateNotificationRequest } from '../../domain/req/CreateNotificationRequest';
import type { GetNotificationsRequest } from '../../domain/req/GetNotificationsRequest';
import type { GetNotificationByIdRequest } from '../../domain/req/GetNotificationByIdRequest';
import type { CreateNotificationChannelRequest } from '../../domain/req/CreateNotificationChannelRequest';
import type { UpdateNotificationChannelRequest } from '../../domain/req/UpdateNotificationChannelRequest';
import type { CreateNotificationTokenRequest } from '../../domain/req/CreateNotificationTokenRequest';
import type { NotificationResponse } from '../../domain/res/NotificationResponse';
import type { NotificationListResponse } from '../../domain/res/NotificationListResponse';
import type { NotificationChannelResponse } from '../../domain/res/NotificationChannelResponse';
import type { NotificationChannelListResponse } from '../../domain/res/NotificationChannelListResponse';
import type { NotificationTokenResponse } from '../../domain/res/NotificationTokenResponse';
import type { NotificationRepository } from '../interface/NotificationRepository';

export class NotificationRepositoryImpl implements NotificationRepository {
    // Notification operations
    createNotification(request: CreateNotificationRequest): Promise<NotificationResponse> {
        return post<NotificationResponse>(API_ROUTES.notifications.root, request);
    }

    getNotifications(request: GetNotificationsRequest): Promise<NotificationListResponse> {
        const params = new URLSearchParams();
        if (request.page !== undefined) params.set('page', String(request.page));
        if (request.limit !== undefined) params.set('limit', String(request.limit));
        const endpoint = params.toString()
            ? `${API_ROUTES.notifications.root}?${params.toString()}`
            : API_ROUTES.notifications.root;

        return get<NotificationListResponse>(endpoint);
    }

    getNotificationById(request: GetNotificationByIdRequest): Promise<NotificationResponse> {
        return get<NotificationResponse>(API_ROUTES.notifications.byId(request.id));
    }

    updateNotification(id: string, isRead: boolean): Promise<NotificationResponse> {
        return patch<NotificationResponse>(API_ROUTES.notifications.byId(id), { isRead });
    }

    deleteNotification(id: string): Promise<void> {
        return del<void>(API_ROUTES.notifications.byId(id));
    }

    // Channel operations
    createChannel(request: CreateNotificationChannelRequest): Promise<NotificationChannelResponse> {
        return post<NotificationChannelResponse>(API_ROUTES.notifications.channels.root, request);
    }

    getChannels(request: GetNotificationsRequest): Promise<NotificationChannelListResponse> {
        const params = new URLSearchParams();
        if (request.page !== undefined) params.set('page', String(request.page));
        if (request.limit !== undefined) params.set('limit', String(request.limit));
        const endpoint = params.toString()
            ? `${API_ROUTES.notifications.channels.root}?${params.toString()}`
            : API_ROUTES.notifications.channels.root;

        return get<NotificationChannelListResponse>(endpoint);
    }

    getChannelById(id: string): Promise<NotificationChannelResponse> {
        return get<NotificationChannelResponse>(API_ROUTES.notifications.channels.byId(id));
    }

    updateChannel(request: UpdateNotificationChannelRequest): Promise<NotificationChannelResponse> {
        return patch<NotificationChannelResponse>(API_ROUTES.notifications.channels.byId(request.id), {
            name: request.name,
            description: request.description,
            isActive: request.isActive,
        });
    }

    deleteChannel(id: string): Promise<void> {
        return del<void>(API_ROUTES.notifications.channels.byId(id));
    }

    // Token operations
    createToken(request: CreateNotificationTokenRequest): Promise<NotificationTokenResponse> {
        return post<NotificationTokenResponse>(API_ROUTES.notifications.tokens.root, request);
    }

    getTokensByUser(userId: string, request: GetNotificationsRequest): Promise<any> {
        const params = new URLSearchParams();
        if (request.page !== undefined) params.set('page', String(request.page));
        if (request.limit !== undefined) params.set('limit', String(request.limit));
        const endpoint = params.toString()
            ? `${API_ROUTES.notifications.tokens.byUser(userId)}?${params.toString()}`
            : API_ROUTES.notifications.tokens.byUser(userId);

        return get<any>(endpoint);
    }

    getTokenById(id: string): Promise<NotificationTokenResponse> {
        return get<NotificationTokenResponse>(API_ROUTES.notifications.tokens.byId(id));
    }

    updateToken(id: string, isActive: boolean): Promise<NotificationTokenResponse> {
        return patch<NotificationTokenResponse>(API_ROUTES.notifications.tokens.byId(id), { isActive });
    }

    deleteToken(id: string): Promise<void> {
        return del<void>(API_ROUTES.notifications.tokens.byId(id));
    }
}