import type { GetUserDashboardTotalRequest } from '../../domain/req/GetUserDashboardTotalRequest';
import type { UserDashboardTotalResponse } from '../../domain/res/UserDashboardTotalResponse';
import type { IGetUserDashboardTotal } from '../interface/IGetUserDashboardTotal';
import type { UserDashboardRepository } from '../../repository/interface/UserDashboardRepository';

export class GetUserDashboardTotal implements IGetUserDashboardTotal {
    constructor(private readonly repository: UserDashboardRepository) {}

    async execute(request: GetUserDashboardTotalRequest): Promise<UserDashboardTotalResponse> {
        return this.repository.getDashboardTotal(request);
    }
}