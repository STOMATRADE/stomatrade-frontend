import type { GetFileByIdRequest } from '../../domain/req/GetFileByIdRequest';
import type { FileResponse } from '../../domain/res/FileResponse';

export interface IGetFileById {
    execute(request: GetFileByIdRequest): Promise<FileResponse>;
}