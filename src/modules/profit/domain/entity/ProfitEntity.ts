export type ProfitEntity = {
    id: string;
    userId: string;
    projectId: string;
    amount: string;
    currency?: string;
    txHash?: string;
    createdAt?: string;
    [key: string]: unknown;
};
