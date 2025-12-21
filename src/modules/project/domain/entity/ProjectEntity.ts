export type ProjectStatus = 'DRAFT' | 'ACTIVE' | 'COMPLETED';

export type ProjectEntity = {
    id: string;
    name: string;
    description?: string;
    status: ProjectStatus;
    totalInvestment: number;
    expectedReturn: number;
    createdAt: string;
};
