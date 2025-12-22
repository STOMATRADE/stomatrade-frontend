import type { GetProfitByProjectRequest } from '../../domain/req/GetProfitByProjectRequest';
import type { ProfitDetailResponse } from '../../domain/res/ProfitDetailResponse';
import type { IGetProfitByProject } from '../interface/IGetProfitByProject';
import type { ProfitRepository } from '../../repository/interface/ProfitRepository';

export class GetProfitByProject implements IGetProfitByProject {
    constructor(private readonly repository: ProfitRepository) {}

    async execute(request: GetProfitByProjectRequest): Promise<ProfitDetailResponse> {
        if (!request.projectId || request.projectId.trim().length === 0) {
            throw new Error('projectId is required');
        }
        return this.repository.getProfitByProject(request);
    }
}
