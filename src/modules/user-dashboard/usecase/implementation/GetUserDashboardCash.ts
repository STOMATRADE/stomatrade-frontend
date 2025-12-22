import type { GetUserDashboardCashRequest } from '../../domain/req/GetUserDashboardCashRequest';
import type { UserDashboardCashResponse } from '../../domain/res/UserDashboardCashResponse';
import type { IGetUserDashboardCash } from '../interface/IGetUserDashboardCash';
import type { UserDashboardRepository } from '../../repository/interface/UserDashboardRepository';

export class GetUserDashboardCash implements IGetUserDashboardCash {
    constructor(private readonly repository: UserDashboardRepository) {}

    async execute(request: GetUserDashboardCashRequest): Promise<UserDashboardCashResponse> {
        return this.repository.getDashboardCash(request);
    }
}