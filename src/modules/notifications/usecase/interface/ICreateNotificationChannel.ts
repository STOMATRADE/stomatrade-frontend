import type { CreateNotificationChannelRequest } from '../../domain/req/CreateNotificationChannelRequest';
import type { NotificationChannelResponse } from '../../domain/res/NotificationChannelResponse';

export interface ICreateNotificationChannel {
    execute(request: CreateNotificationChannelRequest): Promise<NotificationChannelResponse>;
}