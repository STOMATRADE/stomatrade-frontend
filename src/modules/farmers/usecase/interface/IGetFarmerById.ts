import type { FarmerEntity } from '../../domain/entity/FarmerEntity';

export interface IGetFarmerById {
    execute(id: string): Promise<FarmerEntity>;
}
