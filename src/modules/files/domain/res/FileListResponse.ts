import type { FileEntity } from '../entity/FileEntity';

export type FileListResponse = {
    data: FileEntity[];
    meta: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
};