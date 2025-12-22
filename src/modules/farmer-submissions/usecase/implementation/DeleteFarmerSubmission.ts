import type { IDeleteFarmerSubmission } from '../interface/IDeleteFarmerSubmission';
import type { FarmerSubmissionRepository } from '../../repository/interface/FarmerSubmissionRepository';

export class DeleteFarmerSubmission implements IDeleteFarmerSubmission {
    constructor(private readonly repository: FarmerSubmissionRepository) {}

    async execute(id: string): Promise<void> {
        return this.repository.deleteSubmission(id);
    }
}