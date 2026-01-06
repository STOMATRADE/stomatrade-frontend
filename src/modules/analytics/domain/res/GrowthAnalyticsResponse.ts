import type { GrowthDataPointEntity } from '../entity/GrowthDataPointEntity';

export type DateRange = {
    start: string;
    end: string;
};

export type GrowthAnalyticsResponse = {
    period: string;
    total: number;
    dataPoints: number;
    appliedLimit: number;
    dateRange: DateRange;
    data: GrowthDataPointEntity[];
};
