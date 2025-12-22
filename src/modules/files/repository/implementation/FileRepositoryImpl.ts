import { get, post, del } from '@/core/utils/http/httpClient';
import { API_ROUTES } from '@/core/constant/api';
import type { UploadFileRequest } from '../../domain/req/UploadFileRequest';
import type { GetFilesRequest } from '../../domain/req/GetFilesRequest';
import type { GetFileByIdRequest } from '../../domain/req/GetFileByIdRequest';
import type { FileResponse } from '../../domain/res/FileResponse';
import type { FileListResponse } from '../../domain/res/FileListResponse';
import type { FileRepository } from '../interface/FileRepository';

export class FileRepositoryImpl implements FileRepository {
    async uploadFile(request: UploadFileRequest): Promise<FileResponse> {
        const formData = new FormData();
        formData.append('file', request.file);
        
        if (request.referenceId) {
            formData.append('referenceId', request.referenceId);
        }
        
        if (request.referenceType) {
            formData.append('referenceType', request.referenceType);
        }

        return post<FileResponse>(API_ROUTES.files.root, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    }

    getFiles(request: GetFilesRequest): Promise<FileListResponse> {
        const params = new URLSearchParams();
        if (request.page !== undefined) params.set('page', String(request.page));
        if (request.limit !== undefined) params.set('limit', String(request.limit));
        if (request.referenceId) params.set('referenceId', request.referenceId);
        if (request.referenceType) params.set('referenceType', request.referenceType);
        
        const endpoint = params.toString()
            ? `${API_ROUTES.files.root}?${params.toString()}`
            : API_ROUTES.files.root;

        return get<FileListResponse>(endpoint);
    }

    getFileById(request: GetFileByIdRequest): Promise<FileResponse> {
        return get<FileResponse>(API_ROUTES.files.byId(request.id));
    }

    deleteFile(id: string): Promise<void> {
        return del<void>(API_ROUTES.files.byId(id));
    }
}