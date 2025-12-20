import type { CreateFarmerRequest } from '../../domain/req/CreateFarmerRequest';
import type { FarmerEntity } from '../../domain/entity/FarmerEntity';

export interface ICreateFarmer {
    execute(request: CreateFarmerRequest): Promise<FarmerEntity>;
}
