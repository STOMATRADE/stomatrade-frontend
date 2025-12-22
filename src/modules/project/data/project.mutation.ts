import { useMutation, type UseMutationOptions } from '@tanstack/react-query';
import type { CreateProjectRequest } from '../domain/req/CreateProjectRequest';
import type { UpdateProjectRequest } from '../domain/req/UpdateProjectRequest';
import type { ProjectDetailResponse } from '../domain/res/ProjectDetailResponse';
import { ProjectRepositoryImpl } from '../repository/implementation/ProjectRepositoryImpl';
import { CreateProject } from '../usecase/implementation/CreateProject';
import { UpdateProject } from '../usecase/implementation/UpdateProject';
import { DeleteProject } from '../usecase/implementation/DeleteProject';
import type { ApiError } from '@/core/utils/http/httpClient';

export const projectMutationKeys = {
    create: ['projects', 'create'] as const,
    update: ['projects', 'update'] as const,
    delete: ['projects', 'delete'] as const,
};

export const useCreateProjectMutation = (
    options?: UseMutationOptions<ProjectDetailResponse, ApiError, CreateProjectRequest>
) => {
    const repository = new ProjectRepositoryImpl();
    const usecase = new CreateProject(repository);

    return useMutation<ProjectDetailResponse, ApiError, CreateProjectRequest>({
        mutationKey: projectMutationKeys.create,
        mutationFn: (payload) => usecase.execute(payload),
        ...options,
    });
};

export const useUpdateProjectMutation = (
    options?: UseMutationOptions<ProjectDetailResponse, ApiError, UpdateProjectRequest>
) => {
    const repository = new ProjectRepositoryImpl();
    const usecase = new UpdateProject(repository);

    return useMutation<ProjectDetailResponse, ApiError, UpdateProjectRequest>({
        mutationKey: projectMutationKeys.update,
        mutationFn: (payload) => usecase.execute(payload),
        ...options,
    });
};

export const useDeleteProjectMutation = (
    options?: UseMutationOptions<ProjectDetailResponse, ApiError, string>
) => {
    const repository = new ProjectRepositoryImpl();
    const usecase = new DeleteProject(repository);

    return useMutation<ProjectDetailResponse, ApiError, string>({
        mutationKey: projectMutationKeys.delete,
        mutationFn: (id) => usecase.execute(id),
        ...options,
    });
};
