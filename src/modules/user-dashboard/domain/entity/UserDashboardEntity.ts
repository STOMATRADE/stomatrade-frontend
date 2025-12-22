export type UserDashboardCashEntity = {
    userId: string;
    availableCash: number;
    totalInvested: number;
    totalReturns: number;
    pendingReturns: number;
    currency: string;
    updatedAt: string;
};

export type UserDashboardAssetsEntity = {
    userId: string;
    totalAssets: number;
    assetValue: number;
    assetTypes: {
        type: string;
        count: number;
        value: number;
    }[];
    updatedAt: string;
};

export type UserDashboardTotalEntity = {
    userId: string;
    totalPortfolioValue: number;
    totalInvested: number;
    totalReturns: number;
    profitLoss: number;
    profitLossPercentage: number;
    currency: string;
    updatedAt: string;
};