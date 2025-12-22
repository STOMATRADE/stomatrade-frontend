import type { UploadFileRequest } from '../../domain/req/UploadFileRequest';
import type { FileResponse } from '../../domain/res/FileResponse';

export interface IUploadFile {
    execute(request: UploadFileRequest): Promise<FileResponse>;
}