import type { GetFarmerSubmissionsRequest } from '../../domain/req/GetFarmerSubmissionsRequest';
import type { FarmerSubmissionListResponse } from '../../domain/res/FarmerSubmissionListResponse';
import type { IGetFarmerSubmissions } from '../interface/IGetFarmerSubmissions';
import type { FarmerSubmissionRepository } from '../../repository/interface/FarmerSubmissionRepository';

export class GetFarmerSubmissions implements IGetFarmerSubmissions {
    constructor(private readonly repository: FarmerSubmissionRepository) {}

    async execute(request: GetFarmerSubmissionsRequest): Promise<FarmerSubmissionListResponse> {
        return this.repository.getSubmissions(request);
    }
}