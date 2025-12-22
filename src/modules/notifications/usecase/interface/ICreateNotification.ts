import type { CreateNotificationRequest } from '../../domain/req/CreateNotificationRequest';
import type { NotificationResponse } from '../../domain/res/NotificationResponse';

export interface ICreateNotification {
    execute(request: CreateNotificationRequest): Promise<NotificationResponse>;
}