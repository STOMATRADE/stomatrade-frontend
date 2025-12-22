import type { UploadFileRequest } from '../../domain/req/UploadFileRequest';
import type { GetFilesRequest } from '../../domain/req/GetFilesRequest';
import type { GetFileByIdRequest } from '../../domain/req/GetFileByIdRequest';
import type { FileResponse } from '../../domain/res/FileResponse';
import type { FileListResponse } from '../../domain/res/FileListResponse';

export interface FileRepository {
    uploadFile(request: UploadFileRequest): Promise<FileResponse>;
    getFiles(request: GetFilesRequest): Promise<FileListResponse>;
    getFileById(request: GetFileByIdRequest): Promise<FileResponse>;
    deleteFile(id: string): Promise<void>;
}