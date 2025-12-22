import type { GetFileByIdRequest } from '../../domain/req/GetFileByIdRequest';
import type { FileResponse } from '../../domain/res/FileResponse';
import type { IGetFileById } from '../interface/IGetFileById';
import type { FileRepository } from '../../repository/interface/FileRepository';

export class GetFileById implements IGetFileById {
    constructor(private readonly repository: FileRepository) {}

    async execute(request: GetFileByIdRequest): Promise<FileResponse> {
        return this.repository.getFileById(request);
    }
}