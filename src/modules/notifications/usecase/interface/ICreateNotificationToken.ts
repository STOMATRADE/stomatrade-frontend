import type { CreateNotificationTokenRequest } from '../../domain/req/CreateNotificationTokenRequest';
import type { NotificationTokenResponse } from '../../domain/res/NotificationTokenResponse';

export interface ICreateNotificationToken {
    execute(request: CreateNotificationTokenRequest): Promise<NotificationTokenResponse>;
}