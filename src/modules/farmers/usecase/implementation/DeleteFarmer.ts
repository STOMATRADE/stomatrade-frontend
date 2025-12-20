import type { IDeleteFarmer } from '../interface/IDeleteFarmer';
import type { FarmersRepository } from '../../repository/interface/FarmersRepository';

export class DeleteFarmer implements IDeleteFarmer {
    constructor(private readonly repository: FarmersRepository) {}

    async execute(id: string): Promise<void> {
        if (!id || id.trim().length === 0) {
            throw new Error('id is required');
        }
        return this.repository.deleteFarmer(id);
    }
}
