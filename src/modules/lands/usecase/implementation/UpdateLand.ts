import type { UpdateLandRequest } from '../../domain/req/UpdateLandRequest';
import type { LandResponse } from '../../domain/res/LandResponse';
import type { IUpdateLand } from '../interface/IUpdateLand';
import type { LandRepository } from '../../repository/interface/LandRepository';
import { ApiError } from '@/core/utils/http/httpClient';

export class UpdateLand implements IUpdateLand {
    constructor(private readonly repository: LandRepository) {}

    async execute(request: UpdateLandRequest): Promise<LandResponse> {
        if (!request.id || request.id.trim().length === 0) {
            throw new ApiError(400, 'id is required');
        }
        
        return this.repository.updateLand(request);
    }
}