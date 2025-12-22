import { useQuery, type UseQueryOptions } from '@tanstack/react-query';
import type { GetFilesRequest } from '../domain/req/GetFilesRequest';
import type { GetFileByIdRequest } from '../domain/req/GetFileByIdRequest';
import type { FileListResponse } from '../domain/res/FileListResponse';
import type { FileResponse } from '../domain/res/FileResponse';
import { FileRepositoryImpl } from '../repository/implementation/FileRepositoryImpl';
import { GetFiles } from '../usecase/implementation/GetFiles';
import { GetFileById } from '../usecase/implementation/GetFileById';
import type { ApiError } from '@/core/utils/http/httpClient';

export const fileQueryKeys = {
    list: (params: GetFilesRequest) => ['files', 'list', params] as const,
    detail: (id: string) => ['files', 'detail', id] as const,
};

export const useFilesQuery = (
    params: GetFilesRequest,
    options?: UseQueryOptions<FileListResponse, ApiError>
) => {
    const repository = new FileRepositoryImpl();
    const usecase = new GetFiles(repository);

    return useQuery<FileListResponse, ApiError>({
        queryKey: fileQueryKeys.list(params),
        queryFn: () => usecase.execute(params),
        ...options,
    });
};

export const useFileDetailQuery = (
    params: GetFileByIdRequest,
    options?: UseQueryOptions<FileResponse, ApiError>
) => {
    const repository = new FileRepositoryImpl();
    const usecase = new GetFileById(repository);

    return useQuery<FileResponse, ApiError>({
        queryKey: fileQueryKeys.detail(params.id),
        queryFn: () => usecase.execute(params),
        ...options,
    });
};