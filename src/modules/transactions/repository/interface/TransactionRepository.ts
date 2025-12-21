import type { GetTransactionsRequest } from '../../domain/req/GetTransactionsRequest';
import type { CreateTransactionRequest } from '../../domain/req/CreateTransactionRequest';
import type { TransactionListResponse } from '../../domain/res/TransactionListResponse';
import type { TransactionDetailResponse } from '../../domain/res/TransactionDetailResponse';

export interface TransactionRepository {
    getTransactions(request: GetTransactionsRequest): Promise<TransactionListResponse>;
    getTransactionById(id: string): Promise<TransactionDetailResponse>;
    createTransaction(request: CreateTransactionRequest): Promise<TransactionDetailResponse>;
}
