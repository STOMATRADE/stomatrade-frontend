import { get, post, patch, del } from '@/core/utils/http/httpClient';
import { API_ROUTES } from '@/core/constant/api';
import type { CreateLandRequest } from '../../domain/req/CreateLandRequest';
import type { UpdateLandRequest } from '../../domain/req/UpdateLandRequest';
import type { GetLandsRequest } from '../../domain/req/GetLandsRequest';
import type { GetLandByIdRequest } from '../../domain/req/GetLandByIdRequest';
import type { GetLandsByFarmerRequest } from '../../domain/req/GetLandsByFarmerRequest';
import type { LandResponse } from '../../domain/res/LandResponse';
import type { LandListResponse } from '../../domain/res/LandListResponse';
import type { LandRepository } from '../interface/LandRepository';

export class LandRepositoryImpl implements LandRepository {
    createLand(request: CreateLandRequest): Promise<LandResponse> {
        return post<LandResponse>(API_ROUTES.lands.root, request);
    }

    getLands(request: GetLandsRequest): Promise<LandListResponse> {
        const params = new URLSearchParams();
        if (request.page !== undefined) params.set('page', String(request.page));
        if (request.limit !== undefined) params.set('limit', String(request.limit));
        const endpoint = params.toString()
            ? `${API_ROUTES.lands.root}?${params.toString()}`
            : API_ROUTES.lands.root;

        return get<LandListResponse>(endpoint);
    }

    getLandById(request: GetLandByIdRequest): Promise<LandResponse> {
        return get<LandResponse>(API_ROUTES.lands.byId(request.id));
    }

    getLandsByFarmer(request: GetLandsByFarmerRequest): Promise<LandListResponse> {
        const params = new URLSearchParams();
        if (request.page !== undefined) params.set('page', String(request.page));
        if (request.limit !== undefined) params.set('limit', String(request.limit));
        const endpoint = params.toString()
            ? `${API_ROUTES.lands.byFarmer(request.farmerId)}?${params.toString()}`
            : API_ROUTES.lands.byFarmer(request.farmerId);

        return get<LandListResponse>(endpoint);
    }

    updateLand(request: UpdateLandRequest): Promise<LandResponse> {
        return patch<LandResponse>(API_ROUTES.lands.byId(request.id), {
            area: request.area,
            coordinates: request.coordinates,
            address: request.address,
        });
    }

    deleteLand(id: string): Promise<void> {
        return del<void>(API_ROUTES.lands.byId(id));
    }
}