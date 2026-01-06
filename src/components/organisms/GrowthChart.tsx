'use client';

import { useMemo } from 'react';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';
import type { GrowthDataPointEntity } from '@/modules/analytics/domain/entity/GrowthDataPointEntity';
import { PeriodType } from '@/modules/analytics/domain/req/GetAnalyticsRequest';

interface GrowthChartProps {
    data: GrowthDataPointEntity[];
    title: string;
    color?: string;
    isLoading?: boolean;
    error?: string | null;
    selectedPeriod?: PeriodType;
    onPeriodChange?: (period: PeriodType) => void;
    showPeriodToggle?: boolean;
}

const periodOptions = [
    { value: PeriodType.DAILY, label: 'Daily' },
    { value: PeriodType.WEEKLY, label: 'Weekly' },
    { value: PeriodType.MONTHLY, label: 'Monthly' },
    { value: PeriodType.YEARLY, label: 'Yearly' },
];

export default function GrowthChart({
    data,
    title,
    color = '#4ade80',
    isLoading = false,
    error = null,
    selectedPeriod = PeriodType.MONTHLY,
    onPeriodChange,
    showPeriodToggle = true
}: GrowthChartProps) {
    const chartData = useMemo(() => {
        if (!Array.isArray(data)) return [];
        return data.map(item => ({
            label: item.label,
            value: item.value,
        }));
    }, [data]);

    // Custom tooltip component
    const CustomTooltip = ({ active, payload, label }: any) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-[#1a1a2e]/95 backdrop-blur-md border border-white/10 rounded-xl px-4 py-3 shadow-2xl">
                    <p className="text-xs text-text-placeholder mb-1">{label}</p>
                    <p className="text-lg font-bold" style={{ color }}>
                        {payload[0].value} <span className="text-xs font-normal text-text-secondary">new</span>
                    </p>
                </div>
            );
        }
        return null;
    };

    if (isLoading) {
        return (
            <div className="bg-gradient-to-br from-primary-elevated to-primary-container/50 rounded-2xl p-6 border border-white/5 shadow-xl">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-text-primary">{title}</h3>
                </div>
                <div className="h-[280px] flex items-center justify-center">
                    <div className="flex flex-col items-center gap-3">
                        <div className="w-8 h-8 border-2 border-t-transparent rounded-full animate-spin" style={{ borderColor: `${color} transparent ${color} ${color}` }} />
                        <span className="text-sm text-text-placeholder">Loading chart...</span>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-gradient-to-br from-primary-elevated to-primary-container/50 rounded-2xl p-6 border border-white/5 shadow-xl">
                <h3 className="text-lg font-semibold text-text-primary mb-4">{title}</h3>
                <div className="h-[280px] flex items-center justify-center">
                    <div className="flex flex-col items-center gap-2 text-red-400">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="10" />
                            <line x1="12" y1="8" x2="12" y2="12" />
                            <line x1="12" y1="16" x2="12.01" y2="16" />
                        </svg>
                        <span className="text-sm">{error}</span>
                    </div>
                </div>
            </div>
        );
    }

    if (chartData.length === 0) {
        return (
            <div className="bg-gradient-to-br from-primary-elevated to-primary-container/50 rounded-2xl p-6 border border-white/5 shadow-xl">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-text-primary">{title}</h3>
                    {showPeriodToggle && onPeriodChange && (
                        <div className="flex gap-1 bg-primary-container/50 rounded-lg p-1">
                            {periodOptions.map((option) => (
                                <button
                                    key={option.value}
                                    onClick={() => onPeriodChange(option.value)}
                                    className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all duration-200 ${selectedPeriod === option.value
                                            ? 'bg-white/10 text-text-primary shadow-sm'
                                            : 'text-text-placeholder hover:text-text-secondary hover:bg-white/5'
                                        }`}
                                >
                                    {option.label}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
                <div className="h-[280px] flex items-center justify-center">
                    <div className="flex flex-col items-center gap-2 text-text-placeholder">
                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.5">
                            <path d="M3 3v18h18" />
                            <path d="m19 9-5 5-4-4-3 3" />
                        </svg>
                        <span className="text-sm">No data available</span>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-gradient-to-br from-primary-elevated to-primary-container/50 rounded-2xl p-6 border border-white/5 shadow-xl hover:shadow-2xl transition-shadow duration-300">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
                <div>
                    <h3 className="text-lg font-semibold text-text-primary">{title}</h3>
                    <p className="text-xs text-text-placeholder mt-0.5">
                        {chartData.length} data points
                    </p>
                </div>
                {showPeriodToggle && onPeriodChange && (
                    <div className="flex gap-1 bg-primary-container/50 rounded-lg p-1">
                        {periodOptions.map((option) => (
                            <button
                                key={option.value}
                                onClick={() => onPeriodChange(option.value)}
                                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all duration-200 ${selectedPeriod === option.value
                                        ? 'bg-white/10 text-text-primary shadow-sm'
                                        : 'text-text-placeholder hover:text-text-secondary hover:bg-white/5'
                                    }`}
                            >
                                {option.label}
                            </button>
                        ))}
                    </div>
                )}
            </div>
            <div className="h-[280px]">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                        data={chartData}
                        margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                    >
                        <defs>
                            <linearGradient id={`gradient-${title.replace(/\s/g, '')}`} x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor={color} stopOpacity={0.4} />
                                <stop offset="50%" stopColor={color} stopOpacity={0.15} />
                                <stop offset="100%" stopColor={color} stopOpacity={0} />
                            </linearGradient>
                            <filter id={`glow-${title.replace(/\s/g, '')}`}>
                                <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                                <feMerge>
                                    <feMergeNode in="coloredBlur" />
                                    <feMergeNode in="SourceGraphic" />
                                </feMerge>
                            </filter>
                        </defs>
                        <CartesianGrid
                            strokeDasharray="3 3"
                            stroke="rgba(255,255,255,0.05)"
                            vertical={false}
                        />
                        <XAxis
                            dataKey="label"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#666', fontSize: 10 }}
                            dy={10}
                            interval="preserveStartEnd"
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#666', fontSize: 10 }}
                            dx={-5}
                        />
                        <Tooltip
                            content={<CustomTooltip />}
                            cursor={{ stroke: color, strokeWidth: 1, strokeDasharray: '5 5', strokeOpacity: 0.3 }}
                        />
                        <Area
                            type="monotone"
                            dataKey="value"
                            stroke={color}
                            strokeWidth={2.5}
                            fill={`url(#gradient-${title.replace(/\s/g, '')})`}
                            filter={`url(#glow-${title.replace(/\s/g, '')})`}
                            dot={false}
                            activeDot={{
                                r: 6,
                                fill: color,
                                stroke: '#1a1a2e',
                                strokeWidth: 2,
                            }}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
