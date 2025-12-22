import type { GetNotificationByIdRequest } from '../../domain/req/GetNotificationByIdRequest';
import type { NotificationResponse } from '../../domain/res/NotificationResponse';
import type { IGetNotificationById } from '../interface/IGetNotificationById';
import type { NotificationRepository } from '../../repository/interface/NotificationRepository';

export class GetNotificationById implements IGetNotificationById {
    constructor(private readonly repository: NotificationRepository) {}

    async execute(request: GetNotificationByIdRequest): Promise<NotificationResponse> {
        return this.repository.getNotificationById(request);
    }
}