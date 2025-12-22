import type { GetUserDashboardCashRequest } from '../../domain/req/GetUserDashboardCashRequest';
import type { GetUserDashboardAssetsRequest } from '../../domain/req/GetUserDashboardAssetsRequest';
import type { GetUserDashboardTotalRequest } from '../../domain/req/GetUserDashboardTotalRequest';
import type { UserDashboardCashResponse } from '../../domain/res/UserDashboardCashResponse';
import type { UserDashboardAssetsResponse } from '../../domain/res/UserDashboardAssetsResponse';
import type { UserDashboardTotalResponse } from '../../domain/res/UserDashboardTotalResponse';

export interface UserDashboardRepository {
    getDashboardCash(request: GetUserDashboardCashRequest): Promise<UserDashboardCashResponse>;
    getDashboardAssets(request: GetUserDashboardAssetsRequest): Promise<UserDashboardAssetsResponse>;
    getDashboardTotal(request: GetUserDashboardTotalRequest): Promise<UserDashboardTotalResponse>;
}