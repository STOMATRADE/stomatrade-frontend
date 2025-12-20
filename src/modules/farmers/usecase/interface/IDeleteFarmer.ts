export interface IDeleteFarmer {
    execute(id: string): Promise<void>;
}
