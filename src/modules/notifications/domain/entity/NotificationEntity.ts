export type NotificationEntity = {
    id: string;
    title: string;
    message: string;
    channel: string;
    userId?: string;
    isRead: boolean;
    createdAt: string;
    updatedAt: string;
};