import type { UpdateFarmerRequest } from '../../domain/req/UpdateFarmerRequest';
import type { FarmerEntity } from '../../domain/entity/FarmerEntity';
import type { IUpdateFarmer } from '../interface/IUpdateFarmer';
import type { FarmersRepository } from '../../repository/interface/FarmersRepository';

export class UpdateFarmer implements IUpdateFarmer {
    constructor(private readonly repository: FarmersRepository) {}

    async execute(request: UpdateFarmerRequest): Promise<FarmerEntity> {
        if (!request.id || request.id.trim().length === 0) {
            throw new Error('id is required');
        }
        if (!request.name && !request.address) {
            throw new Error('name or address is required');
        }
        return this.repository.updateFarmer(request);
    }
}
