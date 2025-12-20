export type UserRole = 'ADMIN' | 'INVESTOR' | 'COLLECTOR' | 'STAFF';

export type UserEntity = {
    id: string;
    walletAddress: string;
    role: UserRole;
    createdAt: string;
    updatedAt: string;
    deleted: boolean;
};
