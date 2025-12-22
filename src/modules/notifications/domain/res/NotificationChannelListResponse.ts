import type { NotificationChannelEntity } from '../entity/NotificationChannelEntity';

export type NotificationChannelListResponse = {
    data: NotificationChannelEntity[];
    meta: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
};