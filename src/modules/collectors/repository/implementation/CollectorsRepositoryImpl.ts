import { get, post, patch, del } from '@/core/utils/http/httpClient';
import { API_ROUTES } from '@/core/constant/api';
import type { GetCollectorsRequest } from '../../domain/req/GetCollectorsRequest';
import type { CreateCollectorRequest } from '../../domain/req/CreateCollectorRequest';
import type { UpdateCollectorRequest } from '../../domain/req/UpdateCollectorRequest';
import type { CollectorListResponse } from '../../domain/res/CollectorListResponse';
import type { CollectorResponse } from '../../domain/res/CollectorResponse';
import type { CollectorsRepository } from '../interface/CollectorsRepository';

export class CollectorsRepositoryImpl implements CollectorsRepository {
    getCollectors(request: GetCollectorsRequest): Promise<CollectorListResponse> {
        const params = new URLSearchParams();
        if (request.page !== undefined) params.set('page', String(request.page));
        if (request.limit !== undefined) params.set('limit', String(request.limit));
        const endpoint = params.toString()
            ? `${API_ROUTES.collectors.root}?${params.toString()}`
            : API_ROUTES.collectors.root;

        return get<CollectorListResponse>(endpoint);
    }

    getCollectorById(id: string): Promise<CollectorResponse> {
        return get<CollectorResponse>(API_ROUTES.collectors.byId(id));
    }

    createCollector(request: CreateCollectorRequest): Promise<CollectorResponse> {
        return post<CollectorResponse>(API_ROUTES.collectors.root, request);
    }

    updateCollector(request: UpdateCollectorRequest): Promise<CollectorResponse> {
        return patch<CollectorResponse>(API_ROUTES.collectors.byId(request.id), {
            name: request.name,
            address: request.address,
        });
    }

    deleteCollector(id: string): Promise<void> {
        return del<void>(API_ROUTES.collectors.byId(id));
    }
}
