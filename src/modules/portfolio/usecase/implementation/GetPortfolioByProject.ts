import type { PortfolioByProjectRequest, PortfolioRepository } from '../../repository/interface/PortfolioRepository';
import type { PortfolioDetailResponse } from '../../domain/res/PortfolioDetailResponse';
import type { IGetPortfolioByProject } from '../interface/IGetPortfolioByProject';

export class GetPortfolioByProject implements IGetPortfolioByProject {
    constructor(private readonly repository: PortfolioRepository) { }

    async execute(request: PortfolioByProjectRequest): Promise<PortfolioDetailResponse> {
        if (!request.userId || request.userId.trim().length === 0) {
            throw new Error('userId is required');
        }
        if (!request.projectId || request.projectId.trim().length === 0) {
            throw new Error('projectId is required');
        }
        return this.repository.getPortfolioByProject(request);
    }
}
