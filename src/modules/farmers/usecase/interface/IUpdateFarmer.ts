import type { UpdateFarmerRequest } from '../../domain/req/UpdateFarmerRequest';
import type { FarmerEntity } from '../../domain/entity/FarmerEntity';

export interface IUpdateFarmer {
    execute(request: UpdateFarmerRequest): Promise<FarmerEntity>;
}
