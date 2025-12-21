import type { ProfitDetailResponse } from '../../domain/res/ProfitDetailResponse';
import type { IGetProfitById } from '../interface/IGetProfitById';
import type { ProfitRepository } from '../../repository/interface/ProfitRepository';

export class GetProfitById implements IGetProfitById {
    constructor(private readonly repository: ProfitRepository) {}

    async execute(id: string): Promise<ProfitDetailResponse> {
        if (!id || id.trim().length === 0) {
            throw new Error('id is required');
        }
        return this.repository.getProfitById(id);
    }
}
