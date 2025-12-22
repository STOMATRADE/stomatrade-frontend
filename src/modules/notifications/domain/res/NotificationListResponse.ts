import type { NotificationEntity } from '../entity/NotificationEntity';

export type NotificationListResponse = {
    data: NotificationEntity[];
    meta: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
};