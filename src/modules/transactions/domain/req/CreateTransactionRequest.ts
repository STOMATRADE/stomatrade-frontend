import type { TransactionType } from '../entity/TransactionEntity';

export type CreateTransactionRequest = {
    projectId: string;
    amount: number;
    type: Exclude<TransactionType, 'PROFIT'>;
};
