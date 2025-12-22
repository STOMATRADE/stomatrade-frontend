import type { IDeleteLand } from '../interface/IDeleteLand';
import type { LandRepository } from '../../repository/interface/LandRepository';

export class DeleteLand implements IDeleteLand {
    constructor(private readonly repository: LandRepository) {}

    async execute(id: string): Promise<void> {
        return this.repository.deleteLand(id);
    }
}