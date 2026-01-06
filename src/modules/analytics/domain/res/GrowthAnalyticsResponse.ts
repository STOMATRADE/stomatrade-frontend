import type { GrowthDataPointEntity } from '../entity/GrowthDataPointEntity';

export type DateRange = {
    start: string;
    end: string;
};

// Raw API response wrapper
export type GrowthAnalyticsApiResponse = {
    header: {
        statusCode: number;
        message: string;
        timestamp: string;
    };
    data: GrowthAnalyticsResponse;
};

// Actual analytics data
export type GrowthAnalyticsResponse = {
    period: string;
    total: number;
    dataPoints: number;
    appliedLimit: number;
    dateRange: DateRange;
    data: GrowthDataPointEntity[];
};
