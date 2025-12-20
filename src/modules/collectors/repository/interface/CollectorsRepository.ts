import type { GetCollectorsRequest } from '../../domain/req/GetCollectorsRequest';
import type { CreateCollectorRequest } from '../../domain/req/CreateCollectorRequest';
import type { UpdateCollectorRequest } from '../../domain/req/UpdateCollectorRequest';
import type { CollectorListResponse } from '../../domain/res/CollectorListResponse';
import type { CollectorResponse } from '../../domain/res/CollectorResponse';

export interface CollectorsRepository {
    getCollectors(request: GetCollectorsRequest): Promise<CollectorListResponse>;
    getCollectorById(id: string): Promise<CollectorResponse>;
    createCollector(request: CreateCollectorRequest): Promise<CollectorResponse>;
    updateCollector(request: UpdateCollectorRequest): Promise<CollectorResponse>;
    deleteCollector(id: string): Promise<void>;
}
