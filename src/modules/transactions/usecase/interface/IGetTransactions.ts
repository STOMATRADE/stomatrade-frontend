import type { GetTransactionsRequest } from '../../domain/req/GetTransactionsRequest';
import type { TransactionListResponse } from '../../domain/res/TransactionListResponse';

export interface IGetTransactions {
    execute(request: GetTransactionsRequest): Promise<TransactionListResponse>;
}
