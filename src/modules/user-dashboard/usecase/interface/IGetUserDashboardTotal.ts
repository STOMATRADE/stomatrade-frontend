import type { GetUserDashboardTotalRequest } from '../../domain/req/GetUserDashboardTotalRequest';
import type { UserDashboardTotalResponse } from '../../domain/res/UserDashboardTotalResponse';

export interface IGetUserDashboardTotal {
    execute(request: GetUserDashboardTotalRequest): Promise<UserDashboardTotalResponse>;
}