import { get, post, patch, del } from '@/core/utils/http/httpClient';
import { API_ROUTES } from '@/core/constant/api';
import type { CreateBuyerRequest } from '../../domain/req/CreateBuyerRequest';
import type { UpdateBuyerRequest } from '../../domain/req/UpdateBuyerRequest';
import type { CreateBuyerHistoryRequest } from '../../domain/req/CreateBuyerHistoryRequest';
import type { BuyerResponse } from '../../domain/res/BuyerResponse';
import type { BuyerListResponse } from '../../domain/res/BuyerListResponse';
import type { BuyerHistoryResponse } from '../../domain/res/BuyerHistoryResponse';
import type { BuyerRepository } from '../interface/BuyerRepository';

export class BuyerRepositoryImpl implements BuyerRepository {
    getAll(): Promise<BuyerListResponse> {
        return get<BuyerListResponse>(API_ROUTES.buyers.root);
    }

    getById(id: string): Promise<BuyerResponse> {
        return get<BuyerResponse>(API_ROUTES.buyers.byId(id));
    }

    create(request: CreateBuyerRequest): Promise<BuyerResponse> {
        return post<BuyerResponse>(API_ROUTES.buyers.root, request);
    }

    update(id: string, request: UpdateBuyerRequest): Promise<BuyerResponse> {
        return patch<BuyerResponse>(API_ROUTES.buyers.byId(id), {
            name: request.name,
            userId: request.userId,
            email: request.email,
            phone: request.phone,
            address: request.address,
            deleted: request.deleted,
        });
    }

    delete(id: string): Promise<void> {
        return del<void>(API_ROUTES.buyers.byId(id));
    }

    createHistory(request: CreateBuyerHistoryRequest): Promise<BuyerHistoryResponse> {
        return post<BuyerHistoryResponse>(API_ROUTES.buyers.history.root, request);
    }

    getHistoryByBuyerId(buyerId: string): Promise<BuyerHistoryResponse> {
        return get<BuyerHistoryResponse>(API_ROUTES.buyers.history.byBuyer(buyerId));
    }
}
