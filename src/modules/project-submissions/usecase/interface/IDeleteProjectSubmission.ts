export interface IDeleteProjectSubmission {
    execute(id: string): Promise<void>;
}