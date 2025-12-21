import type { CreateBuyerRequest } from '../../domain/req/CreateBuyerRequest';
import type { UpdateBuyerRequest } from '../../domain/req/UpdateBuyerRequest';
import type { CreateBuyerHistoryRequest } from '../../domain/req/CreateBuyerHistoryRequest';
import type { BuyerResponse } from '../../domain/res/BuyerResponse';
import type { BuyerListResponse } from '../../domain/res/BuyerListResponse';
import type { BuyerHistoryResponse } from '../../domain/res/BuyerHistoryResponse';

export interface BuyerRepository {
    getAll(): Promise<BuyerListResponse>;
    getById(id: string): Promise<BuyerResponse>;
    create(request: CreateBuyerRequest): Promise<BuyerResponse>;
    update(id: string, request: UpdateBuyerRequest): Promise<BuyerResponse>;
    delete(id: string): Promise<void>;
    createHistory(request: CreateBuyerHistoryRequest): Promise<BuyerHistoryResponse>;
    getHistoryByBuyerId(buyerId: string): Promise<BuyerHistoryResponse>;
}
