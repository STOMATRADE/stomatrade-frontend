import type { GetUserDashboardAssetsRequest } from '../../domain/req/GetUserDashboardAssetsRequest';
import type { UserDashboardAssetsResponse } from '../../domain/res/UserDashboardAssetsResponse';

export interface IGetUserDashboardAssets {
    execute(request: GetUserDashboardAssetsRequest): Promise<UserDashboardAssetsResponse>;
}