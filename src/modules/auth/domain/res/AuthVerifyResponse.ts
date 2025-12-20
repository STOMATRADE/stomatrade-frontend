import type { UserEntity } from '../entity/UserEntity';

export type AuthVerifyResponse = {
    accessToken: string;
    user: UserEntity;
};
