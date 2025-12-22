import type { CreateNotificationChannelRequest } from '../../domain/req/CreateNotificationChannelRequest';
import type { NotificationChannelResponse } from '../../domain/res/NotificationChannelResponse';
import type { ICreateNotificationChannel } from '../interface/ICreateNotificationChannel';
import type { NotificationRepository } from '../../repository/interface/NotificationRepository';
import { ApiError } from '@/core/utils/http/httpClient';

export class CreateNotificationChannel implements ICreateNotificationChannel {
    constructor(private readonly repository: NotificationRepository) {}

    async execute(request: CreateNotificationChannelRequest): Promise<NotificationChannelResponse> {
        if (!request.name || request.name.trim().length === 0) {
            throw new ApiError(400, 'name is required');
        }
        
        return this.repository.createChannel(request);
    }
}