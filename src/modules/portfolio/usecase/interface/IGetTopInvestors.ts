export interface IGetTopInvestors {
    execute(limit?: number): Promise<any>;
}
