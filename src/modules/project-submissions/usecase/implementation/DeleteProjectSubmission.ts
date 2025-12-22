import type { IDeleteProjectSubmission } from '../interface/IDeleteProjectSubmission';
import type { ProjectSubmissionRepository } from '../../repository/interface/ProjectSubmissionRepository';

export class DeleteProjectSubmission implements IDeleteProjectSubmission {
    constructor(private readonly repository: ProjectSubmissionRepository) {}

    async execute(id: string): Promise<void> {
        return this.repository.deleteSubmission(id);
    }
}