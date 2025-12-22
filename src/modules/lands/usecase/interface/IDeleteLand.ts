export interface IDeleteLand {
    execute(id: string): Promise<void>;
}