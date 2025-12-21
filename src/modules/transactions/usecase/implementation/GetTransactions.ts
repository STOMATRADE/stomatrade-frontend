import type { GetTransactionsRequest } from '../../domain/req/GetTransactionsRequest';
import type { TransactionListResponse } from '../../domain/res/TransactionListResponse';
import type { IGetTransactions } from '../interface/IGetTransactions';
import type { TransactionRepository } from '../../repository/interface/TransactionRepository';

export class GetTransactions implements IGetTransactions {
    constructor(private readonly repository: TransactionRepository) {}

    async execute(request: GetTransactionsRequest): Promise<TransactionListResponse> {
        if (request.userId !== undefined && request.userId.trim().length === 0) {
            throw new Error('userId must not be empty');
        }
        if (request.projectId !== undefined && request.projectId.trim().length === 0) {
            throw new Error('projectId must not be empty');
        }
        if (request.page !== undefined && request.page <= 0) {
            throw new Error('page must be greater than 0');
        }
        if (request.limit !== undefined && request.limit <= 0) {
            throw new Error('limit must be greater than 0');
        }
        return this.repository.getTransactions(request);
    }
}
