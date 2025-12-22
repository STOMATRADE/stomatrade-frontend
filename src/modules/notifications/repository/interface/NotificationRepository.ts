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

export interface NotificationRepository {
    // Notification operations
    createNotification(request: CreateNotificationRequest): Promise<NotificationResponse>;
    getNotifications(request: GetNotificationsRequest): Promise<NotificationListResponse>;
    getNotificationById(request: GetNotificationByIdRequest): Promise<NotificationResponse>;
    updateNotification(id: string, isRead: boolean): Promise<NotificationResponse>;
    deleteNotification(id: string): Promise<void>;
    
    // Channel operations
    createChannel(request: CreateNotificationChannelRequest): Promise<NotificationChannelResponse>;
    getChannels(request: GetNotificationsRequest): Promise<NotificationChannelListResponse>;
    getChannelById(id: string): Promise<NotificationChannelResponse>;
    updateChannel(request: UpdateNotificationChannelRequest): Promise<NotificationChannelResponse>;
    deleteChannel(id: string): Promise<void>;
    
    // Token operations
    createToken(request: CreateNotificationTokenRequest): Promise<NotificationTokenResponse>;
    getTokensByUser(userId: string, request: GetNotificationsRequest): Promise<any>;
    getTokenById(id: string): Promise<NotificationTokenResponse>;
    updateToken(id: string, isActive: boolean): Promise<NotificationTokenResponse>;
    deleteToken(id: string): Promise<void>;
}