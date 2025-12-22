export type NotificationTokenEntity = {
    id: string;
    userId: string;
    token: string;
    deviceType?: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
};