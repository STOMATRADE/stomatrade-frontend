import type { CreateTransactionRequest } from '../../domain/req/CreateTransactionRequest';
import type { TransactionDetailResponse } from '../../domain/res/TransactionDetailResponse';

export interface ICreateTransaction {
    execute(request: CreateTransactionRequest): Promise<TransactionDetailResponse>;
}
