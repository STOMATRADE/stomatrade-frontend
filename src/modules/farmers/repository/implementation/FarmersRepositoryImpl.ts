import { get, post, patch, del } from '@/core/utils/http/httpClient';
import { API_ROUTES } from '@/core/constant/api';
import type { GetFarmersByCollectorRequest } from '../../domain/req/GetFarmersByCollectorRequest';
import type { CreateFarmerRequest } from '../../domain/req/CreateFarmerRequest';
import type { UpdateFarmerRequest } from '../../domain/req/UpdateFarmerRequest';
import type { FarmerListResponse } from '../../domain/res/FarmerListResponse';
import type { FarmerEntity } from '../../domain/entity/FarmerEntity';
import type { FarmersRepository } from '../interface/FarmersRepository';

export class FarmersRepositoryImpl implements FarmersRepository {
    getFarmersByCollector(request: GetFarmersByCollectorRequest): Promise<FarmerListResponse> {
        const params = new URLSearchParams();
        if (request.page !== undefined) params.set('page', String(request.page));
        if (request.limit !== undefined) params.set('limit', String(request.limit));
        const base = API_ROUTES.farmers.byCollector(request.collectorId);
        const endpoint = params.toString() ? `${base}?${params.toString()}` : base;

        return get<FarmerListResponse>(endpoint);
    }

    getFarmerById(id: string): Promise<FarmerEntity> {
        return get<FarmerEntity>(API_ROUTES.farmers.byId(id));
    }

    createFarmer(request: CreateFarmerRequest): Promise<FarmerEntity> {
        return post<FarmerEntity>(API_ROUTES.farmers.root, request);
    }

    updateFarmer(request: UpdateFarmerRequest): Promise<FarmerEntity> {
        return patch<FarmerEntity>(API_ROUTES.farmers.byId(request.id), {
            name: request.name,
            address: request.address,
        });
    }

    deleteFarmer(id: string): Promise<void> {
        return del<void>(API_ROUTES.farmers.byId(id));
    }
}
