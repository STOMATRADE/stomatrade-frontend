import type { GetNotificationsRequest } from '../../domain/req/GetNotificationsRequest';
import type { NotificationListResponse } from '../../domain/res/NotificationListResponse';

export interface IGetNotifications {
    execute(request: GetNotificationsRequest): Promise<NotificationListResponse>;
}