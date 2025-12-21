export interface DeleteBuyerUseCase {
    execute(id: string): Promise<void>;
}
