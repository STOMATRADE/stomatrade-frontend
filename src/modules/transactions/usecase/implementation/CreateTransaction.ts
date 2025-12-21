import type { CreateTransactionRequest } from '../../domain/req/CreateTransactionRequest';
import type { TransactionDetailResponse } from '../../domain/res/TransactionDetailResponse';
import type { ICreateTransaction } from '../interface/ICreateTransaction';
import type { TransactionRepository } from '../../repository/interface/TransactionRepository';

export class CreateTransaction implements ICreateTransaction {
    constructor(private readonly repository: TransactionRepository) {}

    async execute(request: CreateTransactionRequest): Promise<TransactionDetailResponse> {
        if (!request.projectId || request.projectId.trim().length === 0) {
            throw new Error('projectId is required');
        }
        if (request.amount === undefined || Number.isNaN(request.amount) || request.amount <= 0) {
            throw new Error('amount must be greater than 0');
        }
        if (!request.type) {
            throw new Error('type is required');
        }
        return this.repository.createTransaction(request);
    }
}
