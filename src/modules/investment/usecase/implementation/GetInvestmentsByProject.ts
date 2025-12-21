import type { GetInvestmentByProjectRequest } from '../../domain/req/GetInvestmentByProjectRequest';
import type { InvestmentListResponse } from '../../domain/res/InvestmentListResponse';
import type { IGetInvestmentsByProject } from '../interface/IGetInvestmentsByProject';
import type { InvestmentRepository } from '../../repository/interface/InvestmentRepository';

export class GetInvestmentsByProject implements IGetInvestmentsByProject {
    constructor(private readonly repository: InvestmentRepository) {}

    async execute(request: GetInvestmentByProjectRequest): Promise<InvestmentListResponse> {
        if (!request.projectId || request.projectId.trim().length === 0) {
            throw new Error('projectId is required');
        }
        return this.repository.getInvestmentsByProject(request.projectId);
    }
}
