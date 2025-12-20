import type { GetCollectorsRequest } from '../../domain/req/GetCollectorsRequest';
import type { CollectorListResponse } from '../../domain/res/CollectorListResponse';
import type { IGetCollectors } from '../interface/IGetCollectors';
import type { CollectorsRepository } from '../../repository/interface/CollectorsRepository';

export class GetCollectors implements IGetCollectors {
    constructor(private readonly repository: CollectorsRepository) {}

    async execute(request: GetCollectorsRequest): Promise<CollectorListResponse> {
        if (request.page !== undefined && request.page <= 0) {
            throw new Error('page must be greater than 0');
        }
        if (request.limit !== undefined && request.limit <= 0) {
            throw new Error('limit must be greater than 0');
        }
        return this.repository.getCollectors(request);
    }
}
