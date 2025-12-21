import type { TransactionDetailResponse } from '../../domain/res/TransactionDetailResponse';

export interface IGetTransactionById {
    execute(id: string): Promise<TransactionDetailResponse>;
}
