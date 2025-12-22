import { useMutation, type UseMutationOptions } from '@tanstack/react-query';
import type { UploadFileRequest } from '../domain/req/UploadFileRequest';
import type { FileResponse } from '../domain/res/FileResponse';
import { FileRepositoryImpl } from '../repository/implementation/FileRepositoryImpl';
import { UploadFile } from '../usecase/implementation/UploadFile';
import { DeleteFile } from '../usecase/implementation/DeleteFile';
import type { ApiError } from '@/core/utils/http/httpClient';

export const fileMutationKeys = {
    upload: ['files', 'upload'] as const,
    delete: ['files', 'delete'] as const,
};

export const useUploadFileMutation = (
    options?: UseMutationOptions<FileResponse, ApiError, UploadFileRequest>
) => {
    const repository = new FileRepositoryImpl();
    const usecase = new UploadFile(repository);

    return useMutation<FileResponse, ApiError, UploadFileRequest>({
        mutationKey: fileMutationKeys.upload,
        mutationFn: (payload) => usecase.execute(payload),
        ...options,
    });
};

export const useDeleteFileMutation = (
    options?: UseMutationOptions<void, ApiError, string>
) => {
    const repository = new FileRepositoryImpl();
    const usecase = new DeleteFile(repository);

    return useMutation<void, ApiError, string>({
        mutationKey: fileMutationKeys.delete,
        mutationFn: (id) => usecase.execute(id),
        ...options,
    });
};