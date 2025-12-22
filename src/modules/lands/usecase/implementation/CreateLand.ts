import type { CreateLandRequest } from '../../domain/req/CreateLandRequest';
import type { LandResponse } from '../../domain/res/LandResponse';
import type { ICreateLand } from '../interface/ICreateLand';
import type { LandRepository } from '../../repository/interface/LandRepository';
import { ApiError } from '@/core/utils/http/httpClient';

export class CreateLand implements ICreateLand {
    constructor(private readonly repository: LandRepository) {}

    async execute(request: CreateLandRequest): Promise<LandResponse> {
        if (!request.farmerId || request.farmerId.trim().length === 0) {
            throw new ApiError(400, 'farmerId is required');
        }
        if (!request.area || request.area <= 0) {
            throw new ApiError(400, 'area must be greater than 0');
        }
        if (!request.coordinates || request.coordinates.trim().length === 0) {
            throw new ApiError(400, 'coordinates are required');
        }
        if (!request.address || request.address.trim().length === 0) {
            throw new ApiError(400, 'address is required');
        }
        
        return this.repository.createLand(request);
    }
}