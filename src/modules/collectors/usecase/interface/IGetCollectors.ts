import type { GetCollectorsRequest } from '../../domain/req/GetCollectorsRequest';
import type { CollectorListResponse } from '../../domain/res/CollectorListResponse';

export interface IGetCollectors {
    execute(request: GetCollectorsRequest): Promise<CollectorListResponse>;
}
