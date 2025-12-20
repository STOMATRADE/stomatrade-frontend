import type { IDeleteCollector } from '../interface/IDeleteCollector';
import type { CollectorsRepository } from '../../repository/interface/CollectorsRepository';

export class DeleteCollector implements IDeleteCollector {
    constructor(private readonly repository: CollectorsRepository) {}

    async execute(id: string): Promise<void> {
        if (!id || id.trim().length === 0) {
            throw new Error('id is required');
        }
        return this.repository.deleteCollector(id);
    }
}
