import type { CollectorResponse } from '../../domain/res/CollectorResponse';

export interface IGetCollectorById {
    execute(id: string): Promise<CollectorResponse>;
}
