import type { UpdateCollectorRequest } from '../../domain/req/UpdateCollectorRequest';
import type { CollectorResponse } from '../../domain/res/CollectorResponse';

export interface IUpdateCollector {
    execute(request: UpdateCollectorRequest): Promise<CollectorResponse>;
}
