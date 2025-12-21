export type InvestmentStatus = 'PENDING' | 'ACTIVE' | 'COMPLETED';

export type InvestmentEntity = {
    id: string;
    projectId: string;
    userId: string;
    amount: number;
    status: InvestmentStatus;
    createdAt: string;
};
