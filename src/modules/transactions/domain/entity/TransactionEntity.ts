export type TransactionType = 'INVEST' | 'WITHDRAW' | 'PROFIT';
export type TransactionStatus = 'PENDING' | 'SUCCESS' | 'FAILED';

export type TransactionEntity = {
    id: string;
    userId: string;
    projectId: string;
    amount: number;
    type: TransactionType;
    status: TransactionStatus;
    txHash?: string;
    createdAt: string;
};
