import type { CreateCollectorRequest } from '../../domain/req/CreateCollectorRequest';
import type { CollectorResponse } from '../../domain/res/CollectorResponse';

export interface ICreateCollector {
    execute(request: CreateCollectorRequest): Promise<CollectorResponse>;
}
