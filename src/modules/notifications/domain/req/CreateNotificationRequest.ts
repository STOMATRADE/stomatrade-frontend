export type CreateNotificationRequest = {
    title: string;
    message: string;
    channel: string;
    userId?: string;
};