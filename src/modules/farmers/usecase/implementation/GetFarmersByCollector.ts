import type { GetFarmersByCollectorRequest } from '../../domain/req/GetFarmersByCollectorRequest';
import type { FarmerListResponse } from '../../domain/res/FarmerListResponse';
import type { IGetFarmersByCollector } from '../interface/IGetFarmersByCollector';
import type { FarmersRepository } from '../../repository/interface/FarmersRepository';

export class GetFarmersByCollector implements IGetFarmersByCollector {
    constructor(private readonly repository: FarmersRepository) {}

    async execute(request: GetFarmersByCollectorRequest): Promise<FarmerListResponse> {
        if (!request.collectorId || request.collectorId.trim().length === 0) {
            throw new Error('collectorId is required');
        }
        if (request.page !== undefined && request.page <= 0) {
            throw new Error('page must be greater than 0');
        }
        if (request.limit !== undefined && request.limit <= 0) {
            throw new Error('limit must be greater than 0');
        }
        return this.repository.getFarmersByCollector(request);
    }
}
