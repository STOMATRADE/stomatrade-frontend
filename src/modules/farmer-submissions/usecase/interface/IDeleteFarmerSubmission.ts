export interface IDeleteFarmerSubmission {
    execute(id: string): Promise<void>;
}