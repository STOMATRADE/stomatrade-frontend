import type { GetNotificationsRequest } from '../../domain/req/GetNotificationsRequest';
import type { NotificationListResponse } from '../../domain/res/NotificationListResponse';
import type { IGetNotifications } from '../interface/IGetNotifications';
import type { NotificationRepository } from '../../repository/interface/NotificationRepository';

export class GetNotifications implements IGetNotifications {
    constructor(private readonly repository: NotificationRepository) {}

    async execute(request: GetNotificationsRequest): Promise<NotificationListResponse> {
        return this.repository.getNotifications(request);
    }
}