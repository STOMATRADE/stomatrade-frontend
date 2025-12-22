import { get } from '@/core/utils/http/httpClient';
import { API_ROUTES } from '@/core/constant/api';
import type { GetUserDashboardCashRequest } from '../../domain/req/GetUserDashboardCashRequest';
import type { GetUserDashboardAssetsRequest } from '../../domain/req/GetUserDashboardAssetsRequest';
import type { GetUserDashboardTotalRequest } from '../../domain/req/GetUserDashboardTotalRequest';
import type { UserDashboardCashResponse } from '../../domain/res/UserDashboardCashResponse';
import type { UserDashboardAssetsResponse } from '../../domain/res/UserDashboardAssetsResponse';
import type { UserDashboardTotalResponse } from '../../domain/res/UserDashboardTotalResponse';
import type { UserDashboardRepository } from '../interface/UserDashboardRepository';

export class UserDashboardRepositoryImpl implements UserDashboardRepository {
    getDashboardCash(request: GetUserDashboardCashRequest): Promise<UserDashboardCashResponse> {
        return get<UserDashboardCashResponse>(API_ROUTES.userDashboard.cash(request.userId));
    }

    getDashboardAssets(request: GetUserDashboardAssetsRequest): Promise<UserDashboardAssetsResponse> {
        return get<UserDashboardAssetsResponse>(API_ROUTES.userDashboard.assets(request.userId));
    }

    getDashboardTotal(request: GetUserDashboardTotalRequest): Promise<UserDashboardTotalResponse> {
        return get<UserDashboardTotalResponse>(API_ROUTES.userDashboard.total(request.userId));
    }
}