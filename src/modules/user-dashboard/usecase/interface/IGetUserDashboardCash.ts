import type { GetUserDashboardCashRequest } from '../../domain/req/GetUserDashboardCashRequest';
import type { UserDashboardCashResponse } from '../../domain/res/UserDashboardCashResponse';

export interface IGetUserDashboardCash {
    execute(request: GetUserDashboardCashRequest): Promise<UserDashboardCashResponse>;
}