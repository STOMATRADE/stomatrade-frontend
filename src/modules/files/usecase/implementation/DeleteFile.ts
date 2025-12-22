import type { IDeleteFile } from '../interface/IDeleteFile';
import type { FileRepository } from '../../repository/interface/FileRepository';

export class DeleteFile implements IDeleteFile {
    constructor(private readonly repository: FileRepository) {}

    async execute(id: string): Promise<void> {
        return this.repository.deleteFile(id);
    }
}