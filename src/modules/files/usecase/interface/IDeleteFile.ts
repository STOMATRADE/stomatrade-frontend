export interface IDeleteFile {
    execute(id: string): Promise<void>;
}