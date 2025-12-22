import type { GetFilesRequest } from '../../domain/req/GetFilesRequest';
import type { FileListResponse } from '../../domain/res/FileListResponse';

export interface IGetFiles {
    execute(request: GetFilesRequest): Promise<FileListResponse>;
}