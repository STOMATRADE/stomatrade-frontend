import type { TransactionDetailResponse } from '../../domain/res/TransactionDetailResponse';
import type { IGetTransactionById } from '../interface/IGetTransactionById';
import type { TransactionRepository } from '../../repository/interface/TransactionRepository';

export class GetTransactionById implements IGetTransactionById {
    constructor(private readonly repository: TransactionRepository) {}

    async execute(id: string): Promise<TransactionDetailResponse> {
        if (!id || id.trim().length === 0) {
            throw new Error('id is required');
        }
        return this.repository.getTransactionById(id);
    }
}
