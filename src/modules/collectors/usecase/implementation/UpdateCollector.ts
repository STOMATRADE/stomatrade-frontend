import type { UpdateCollectorRequest } from '../../domain/req/UpdateCollectorRequest';
import type { CollectorResponse } from '../../domain/res/CollectorResponse';
import type { IUpdateCollector } from '../interface/IUpdateCollector';
import type { CollectorsRepository } from '../../repository/interface/CollectorsRepository';

export class UpdateCollector implements IUpdateCollector {
    constructor(private readonly repository: CollectorsRepository) {}

    async execute(request: UpdateCollectorRequest): Promise<CollectorResponse> {
        if (!request.id || request.id.trim().length === 0) {
            throw new Error('id is required');
        }
        if (!request.name && !request.address) {
            throw new Error('name or address is required');
        }
        return this.repository.updateCollector(request);
    }
}
