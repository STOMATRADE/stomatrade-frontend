import type { AuthProfileResponse } from '../../domain/res/AuthProfileResponse';
import type { IGetAuthProfile } from '../interface/IGetAuthProfile';
import type { AuthRepository } from '../../repository/interface/AuthRepository';

export class GetAuthProfile implements IGetAuthProfile {
    constructor(private readonly repository: AuthRepository) {}

    async execute(): Promise<AuthProfileResponse> {
        return this.repository.getProfile();
    }
}
