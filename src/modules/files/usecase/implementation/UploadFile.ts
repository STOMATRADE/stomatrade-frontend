import type { UploadFileRequest } from '../../domain/req/UploadFileRequest';
import type { FileResponse } from '../../domain/res/FileResponse';
import type { IUploadFile } from '../interface/IUploadFile';
import type { FileRepository } from '../../repository/interface/FileRepository';
import { ApiError } from '@/core/utils/http/httpClient';

export class UploadFile implements IUploadFile {
    constructor(private readonly repository: FileRepository) {}

    async execute(request: UploadFileRequest): Promise<FileResponse> {
        if (!request.file) {
            throw new ApiError(400, 'file is required');
        }
        
        return this.repository.uploadFile(request);
    }
}