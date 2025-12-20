import type { CollectorResponse } from '../../domain/res/CollectorResponse';
import type { IGetCollectorById } from '../interface/IGetCollectorById';
import type { CollectorsRepository } from '../../repository/interface/CollectorsRepository';

export class GetCollectorById implements IGetCollectorById {
    constructor(private readonly repository: CollectorsRepository) {}

    async execute(id: string): Promise<CollectorResponse> {
        if (!id || id.trim().length === 0) {
            throw new Error('id is required');
        }
        return this.repository.getCollectorById(id);
    }
}
