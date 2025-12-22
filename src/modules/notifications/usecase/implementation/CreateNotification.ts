import type { CreateNotificationRequest } from '../../domain/req/CreateNotificationRequest';
import type { NotificationResponse } from '../../domain/res/NotificationResponse';
import type { ICreateNotification } from '../interface/ICreateNotification';
import type { NotificationRepository } from '../../repository/interface/NotificationRepository';
import { ApiError } from '@/core/utils/http/httpClient';

export class CreateNotification implements ICreateNotification {
    constructor(private readonly repository: NotificationRepository) {}

    async execute(request: CreateNotificationRequest): Promise<NotificationResponse> {
        if (!request.title || request.title.trim().length === 0) {
            throw new ApiError(400, 'title is required');
        }
        if (!request.message || request.message.trim().length === 0) {
            throw new ApiError(400, 'message is required');
        }
        if (!request.channel || request.channel.trim().length === 0) {
            throw new ApiError(400, 'channel is required');
        }
        
        return this.repository.createNotification(request);
    }
}