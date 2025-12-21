import { get, post } from '@/core/utils/http/httpClient';
import { API_ROUTES } from '@/core/constant/api';
import type { GetTransactionsRequest } from '../../domain/req/GetTransactionsRequest';
import type { CreateTransactionRequest } from '../../domain/req/CreateTransactionRequest';
import type { TransactionListResponse } from '../../domain/res/TransactionListResponse';
import type { TransactionDetailResponse } from '../../domain/res/TransactionDetailResponse';
import type { TransactionRepository } from '../interface/TransactionRepository';

export class TransactionRepositoryImpl implements TransactionRepository {
    getTransactions(request: GetTransactionsRequest): Promise<TransactionListResponse> {
        const params = new URLSearchParams();
        if (request.page !== undefined) params.set('page', String(request.page));
        if (request.limit !== undefined) params.set('limit', String(request.limit));
        if (request.projectId) params.set('projectId', request.projectId);

        const base = request.userId
            ? API_ROUTES.transactions.byUser(request.userId)
            : API_ROUTES.transactions.root;
        const endpoint = params.toString() ? `${base}?${params.toString()}` : base;

        return get<TransactionListResponse>(endpoint);
    }

    getTransactionById(id: string): Promise<TransactionDetailResponse> {
        return get<TransactionDetailResponse>(API_ROUTES.transactions.byId(id));
    }

    createTransaction(request: CreateTransactionRequest): Promise<TransactionDetailResponse> {
        return post<TransactionDetailResponse>(API_ROUTES.transactions.root, request);
    }
}
