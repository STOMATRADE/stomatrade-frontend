import type { GetUserDashboardAssetsRequest } from '../../domain/req/GetUserDashboardAssetsRequest';
import type { UserDashboardAssetsResponse } from '../../domain/res/UserDashboardAssetsResponse';
import type { IGetUserDashboardAssets } from '../interface/IGetUserDashboardAssets';
import type { UserDashboardRepository } from '../../repository/interface/UserDashboardRepository';

export class GetUserDashboardAssets implements IGetUserDashboardAssets {
    constructor(private readonly repository: UserDashboardRepository) {}

    async execute(request: GetUserDashboardAssetsRequest): Promise<UserDashboardAssetsResponse> {
        return this.repository.getDashboardAssets(request);
    }
}