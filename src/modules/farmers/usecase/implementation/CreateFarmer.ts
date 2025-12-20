import type { CreateFarmerRequest } from '../../domain/req/CreateFarmerRequest';
import type { FarmerEntity } from '../../domain/entity/FarmerEntity';
import type { ICreateFarmer } from '../interface/ICreateFarmer';
import type { FarmersRepository } from '../../repository/interface/FarmersRepository';

export class CreateFarmer implements ICreateFarmer {
    constructor(private readonly repository: FarmersRepository) {}

    async execute(request: CreateFarmerRequest): Promise<FarmerEntity> {
        if (!request.collectorId || request.collectorId.trim().length === 0) {
            throw new Error('collectorId is required');
        }
        if (!request.nik || request.nik.trim().length === 0) {
            throw new Error('nik is required');
        }
        if (!request.name || request.name.trim().length === 0) {
            throw new Error('name is required');
        }
        if (!request.address || request.address.trim().length === 0) {
            throw new Error('address is required');
        }
        return this.repository.createFarmer(request);
    }
}
