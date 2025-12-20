export type UserRole = 'ADMIN' | 'INVESTOR' | 'COLLECTOR' | 'STAFF' | string;

export type UserEntity = {
    id: string;
    walletAddress: string;
    role: UserRole;
};
