import type { ProjectStatus } from '../entity/ProjectEntity';

export type UpdateProjectRequest = {
    id: string;
    tokenId?: number;
    collectorId?: string;
    farmerId?: string;
    landId?: string;
    name?: string;
    commodity?: string;
    volume?: number;
    volumeDecimal?: number;
    profitShare?: number;
    sendDate?: string;
    status?: ProjectStatus;
};
