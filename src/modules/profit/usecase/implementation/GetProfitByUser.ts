import type { GetProfitByUserRequest } from '../../domain/req/GetProfitByUserRequest';
import type { ProfitClaimsResponse } from '../../domain/res/ProfitClaimsResponse';
import type { IGetProfitByUser } from '../interface/IGetProfitByUser';
import type { ProfitRepository } from '../../repository/interface/ProfitRepository';

export class GetProfitByUser implements IGetProfitByUser {
    constructor(private readonly repository: ProfitRepository) {}

    async execute(request: GetProfitByUserRequest): Promise<ProfitClaimsResponse> {
        if (!request.userId || request.userId.trim().length === 0) {
            throw new Error('userId is required');
        }
        return this.repository.getProfitByUser(request);
    }
}
