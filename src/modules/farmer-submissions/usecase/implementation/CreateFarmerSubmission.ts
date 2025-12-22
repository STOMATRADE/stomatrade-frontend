import type { CreateFarmerSubmissionRequest } from '../../domain/req/CreateFarmerSubmissionRequest';
import type { FarmerSubmissionResponse } from '../../domain/res/FarmerSubmissionResponse';
import type { ICreateFarmerSubmission } from '../interface/ICreateFarmerSubmission';
import type { FarmerSubmissionRepository } from '../../repository/interface/FarmerSubmissionRepository';
import { ApiError } from '@/core/utils/http/httpClient';

export class CreateFarmerSubmission implements ICreateFarmerSubmission {
    constructor(private readonly repository: FarmerSubmissionRepository) {}

    async execute(request: CreateFarmerSubmissionRequest): Promise<FarmerSubmissionResponse> {
        if (!request.farmerId || request.farmerId.trim().length === 0) {
            throw new ApiError(400, 'farmerId is required');
        }
        if (!request.documentUrl || request.documentUrl.trim().length === 0) {
            throw new ApiError(400, 'documentUrl is required');
        }
        
        return this.repository.createSubmission(request);
    }
}