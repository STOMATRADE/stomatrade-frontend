export interface IDeleteInvestment {
    execute(id: string): Promise<void>;
}
