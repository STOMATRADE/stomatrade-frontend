import type { GetFarmersByCollectorRequest } from '../../domain/req/GetFarmersByCollectorRequest';
import type { CreateFarmerRequest } from '../../domain/req/CreateFarmerRequest';
import type { UpdateFarmerRequest } from '../../domain/req/UpdateFarmerRequest';
import type { FarmerListResponse } from '../../domain/res/FarmerListResponse';
import type { FarmerEntity } from '../../domain/entity/FarmerEntity';

export interface FarmersRepository {
    getFarmersByCollector(request: GetFarmersByCollectorRequest): Promise<FarmerListResponse>;
    getFarmerById(id: string): Promise<FarmerEntity>;
    createFarmer(request: CreateFarmerRequest): Promise<FarmerEntity>;
    updateFarmer(request: UpdateFarmerRequest): Promise<FarmerEntity>;
    deleteFarmer(id: string): Promise<void>;
}
