import type { CreateCollectorRequest } from '../../domain/req/CreateCollectorRequest';
import type { CollectorResponse } from '../../domain/res/CollectorResponse';
import type { ICreateCollector } from '../interface/ICreateCollector';
import type { CollectorsRepository } from '../../repository/interface/CollectorsRepository';

export class CreateCollector implements ICreateCollector {
    constructor(private readonly repository: CollectorsRepository) {}

    async execute(request: CreateCollectorRequest): Promise<CollectorResponse> {
        if (!request.userId || request.userId.trim().length === 0) {
            throw new Error('userId is required');
        }
        if (!request.nik || request.nik.trim().length === 0) {
            throw new Error('nik is required');
        }
        if (!request.name || request.name.trim().length === 0) {
            throw new Error('name is required');
        }
        if (!request.address || request.address.trim().length === 0) {
            throw new Error('address is required');
        }
        return this.repository.createCollector(request);
    }
}
