import type { GetNotificationByIdRequest } from '../../domain/req/GetNotificationByIdRequest';
import type { NotificationResponse } from '../../domain/res/NotificationResponse';

export interface IGetNotificationById {
    execute(request: GetNotificationByIdRequest): Promise<NotificationResponse>;
}