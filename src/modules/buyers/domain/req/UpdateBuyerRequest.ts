export type UpdateBuyerRequest = {
    id: string;
    name?: string;
    userId?: string;
    email?: string;
    phone?: string;
    address?: string;
    deleted?: boolean;
};
