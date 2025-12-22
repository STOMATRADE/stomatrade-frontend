import type { UpdateNotificationChannelRequest } from '../../domain/req/UpdateNotificationChannelRequest';
import type { NotificationChannelResponse } from '../../domain/res/NotificationChannelResponse';

export interface IUpdateNotificationChannel {
    execute(request: UpdateNotificationChannelRequest): Promise<NotificationChannelResponse>;
}