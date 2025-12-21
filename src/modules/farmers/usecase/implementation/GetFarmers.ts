import type { GetFarmersRequest } from '../../domain/req/GetFarmersRequest';
import type { FarmerListResponse } from '../../domain/res/FarmerListResponse';
import type { IGetFarmers } from '../interface/IGetFarmers';
import type { FarmersRepository } from '../../repository/interface/FarmersRepository';

export class GetFarmers implements IGetFarmers {
    constructor(private readonly repository: FarmersRepository) {}

    async execute(request: GetFarmersRequest): Promise<FarmerListResponse> {
        if (request.page !== undefined && request.page <= 0) {
            throw new Error('page must be greater than 0');
        }
        if (request.limit !== undefined && request.limit <= 0) {
            throw new Error('limit must be greater than 0');
        }
        return this.repository.getFarmers(request);
    }
}
