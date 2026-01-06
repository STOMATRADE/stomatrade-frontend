export enum PeriodType {
    DAILY = 'daily',
    WEEKLY = 'weekly',
    MONTHLY = 'monthly',
    YEARLY = 'yearly',
}

export type GetAnalyticsRequest = {
    period: PeriodType;
    limit?: number;
    startDate?: string;
    endDate?: string;
};
