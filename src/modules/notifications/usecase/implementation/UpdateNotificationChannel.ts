import type { UpdateNotificationChannelRequest } from '../../domain/req/UpdateNotificationChannelRequest';
import type { NotificationChannelResponse } from '../../domain/res/NotificationChannelResponse';
import type { IUpdateNotificationChannel } from '../interface/IUpdateNotificationChannel';
import type { NotificationRepository } from '../../repository/interface/NotificationRepository';

export class UpdateNotificationChannel implements IUpdateNotificationChannel {
    constructor(private readonly repository: NotificationRepository) {}

    async execute(request: UpdateNotificationChannelRequest): Promise<NotificationChannelResponse> {
        return this.repository.updateChannel(request);
    }
}