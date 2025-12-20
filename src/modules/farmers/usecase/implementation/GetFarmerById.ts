import type { FarmerEntity } from '../../domain/entity/FarmerEntity';
import type { IGetFarmerById } from '../interface/IGetFarmerById';
import type { FarmersRepository } from '../../repository/interface/FarmersRepository';

export class GetFarmerById implements IGetFarmerById {
    constructor(private readonly repository: FarmersRepository) {}

    async execute(id: string): Promise<FarmerEntity> {
        if (!id || id.trim().length === 0) {
            throw new Error('id is required');
        }
        return this.repository.getFarmerById(id);
    }
}
