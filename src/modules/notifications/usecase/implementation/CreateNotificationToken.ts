import type { CreateNotificationTokenRequest } from '../../domain/req/CreateNotificationTokenRequest';
import type { NotificationTokenResponse } from '../../domain/res/NotificationTokenResponse';
import type { ICreateNotificationToken } from '../interface/ICreateNotificationToken';
import type { NotificationRepository } from '../../repository/interface/NotificationRepository';
import { ApiError } from '@/core/utils/http/httpClient';

export class CreateNotificationToken implements ICreateNotificationToken {
    constructor(private readonly repository: NotificationRepository) {}

    async execute(request: CreateNotificationTokenRequest): Promise<NotificationTokenResponse> {
        if (!request.userId || request.userId.trim().length === 0) {
            throw new ApiError(400, 'userId is required');
        }
        if (!request.token || request.token.trim().length === 0) {
            throw new ApiError(400, 'token is required');
        }
        
        return this.repository.createToken(request);
    }
}