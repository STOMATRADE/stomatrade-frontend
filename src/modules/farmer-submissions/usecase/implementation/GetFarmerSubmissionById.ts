import type { GetFarmerSubmissionByIdRequest } from '../../domain/req/GetFarmerSubmissionByIdRequest';
import type { FarmerSubmissionResponse } from '../../domain/res/FarmerSubmissionResponse';
import type { IGetFarmerSubmissionById } from '../interface/IGetFarmerSubmissionById';
import type { FarmerSubmissionRepository } from '../../repository/interface/FarmerSubmissionRepository';

export class GetFarmerSubmissionById implements IGetFarmerSubmissionById {
    constructor(private readonly repository: FarmerSubmissionRepository) {}

    async execute(request: GetFarmerSubmissionByIdRequest): Promise<FarmerSubmissionResponse> {
        return this.repository.getSubmissionById(request);
    }
}