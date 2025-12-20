export interface IDeleteCollector {
    execute(id: string): Promise<void>;
}
