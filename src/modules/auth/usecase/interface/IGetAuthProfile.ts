import type { AuthProfileResponse } from '../../domain/res/AuthProfileResponse';

export interface IGetAuthProfile {
    execute(): Promise<AuthProfileResponse>;
}
