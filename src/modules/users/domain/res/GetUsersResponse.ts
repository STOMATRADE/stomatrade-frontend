import type { UserEntity } from '../entity/UserEntity';
import type { PaginationMetaEntity } from '../entity/PaginationMetaEntity';

export type GetUsersResponse = {
    data: UserEntity[];
    meta: PaginationMetaEntity;
};
