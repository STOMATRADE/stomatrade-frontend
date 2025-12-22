import type { GetFilesRequest } from '../../domain/req/GetFilesRequest';
import type { FileListResponse } from '../../domain/res/FileListResponse';
import type { IGetFiles } from '../interface/IGetFiles';
import type { FileRepository } from '../../repository/interface/FileRepository';

export class GetFiles implements IGetFiles {
    constructor(private readonly repository: FileRepository) {}

    async execute(request: GetFilesRequest): Promise<FileListResponse> {
        return this.repository.getFiles(request);
    }
}