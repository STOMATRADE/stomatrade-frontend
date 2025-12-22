import type { GetInvestmentByProjectRequest } from '../../domain/req/GetInvestmentByProjectRequest';
import type { InvestmentProjectStatsResponse } from '../../domain/res/InvestmentProjectStatsResponse';
import type { IGetInvestmentsByProject } from '../interface/IGetInvestmentsByProject';
import type { InvestmentRepository } from '../../repository/interface/InvestmentRepository';

export class GetInvestmentsByProject implements IGetInvestmentsByProject {
    constructor(private readonly repository: InvestmentRepository) {}

    async execute(request: GetInvestmentByProjectRequest): Promise<InvestmentProjectStatsResponse> {
        if (!request.projectId || request.projectId.trim().length === 0) {
            throw new Error('projectId is required');
        }
        return this.repository.getProjectStats(request.projectId);
    }
}
