import { get, post, patch, del } from '@/core/utils/http/httpClient';
import { API_ROUTES } from '@/core/constant/api';
import type { CreateProjectSubmissionRequest } from '../../domain/req/CreateProjectSubmissionRequest';
import type { GetProjectSubmissionsRequest } from '../../domain/req/GetProjectSubmissionsRequest';
import type { GetProjectSubmissionByIdRequest } from '../../domain/req/GetProjectSubmissionByIdRequest';
import type { ReviewProjectSubmissionRequest } from '../../domain/req/ReviewProjectSubmissionRequest';
import type { ProjectSubmissionResponse } from '../../domain/res/ProjectSubmissionResponse';
import type { ProjectSubmissionListResponse } from '../../domain/res/ProjectSubmissionListResponse';
import type { ProjectSubmissionRepository } from '../interface/ProjectSubmissionRepository';

export class ProjectSubmissionRepositoryImpl implements ProjectSubmissionRepository {
    createSubmission(request: CreateProjectSubmissionRequest): Promise<ProjectSubmissionResponse> {
        return post<ProjectSubmissionResponse>(API_ROUTES.projectSubmissions.root, request);
    }

    getSubmissions(request: GetProjectSubmissionsRequest): Promise<ProjectSubmissionListResponse> {
        const params = new URLSearchParams();
        if (request.page !== undefined) params.set('page', String(request.page));
        if (request.limit !== undefined) params.set('limit', String(request.limit));
        if (request.status) params.set('status', request.status);
        const endpoint = params.toString()
            ? `${API_ROUTES.projectSubmissions.root}?${params.toString()}`
            : API_ROUTES.projectSubmissions.root;

        return get<ProjectSubmissionListResponse>(endpoint);
    }

    getSubmissionById(request: GetProjectSubmissionByIdRequest): Promise<ProjectSubmissionResponse> {
        return get<ProjectSubmissionResponse>(API_ROUTES.projectSubmissions.byId(request.id));
    }

    approveSubmission(id: string, notes?: string): Promise<ProjectSubmissionResponse> {
        return patch<ProjectSubmissionResponse>(API_ROUTES.projectSubmissions.approve(id), { notes });
    }

    rejectSubmission(id: string, notes?: string): Promise<ProjectSubmissionResponse> {
        return patch<ProjectSubmissionResponse>(API_ROUTES.projectSubmissions.reject(id), { notes });
    }

    updateSubmission(request: ReviewProjectSubmissionRequest): Promise<ProjectSubmissionResponse> {
        if (request.status === 'approved') {
            return this.approveSubmission(request.id, request.notes);
        } else if (request.status === 'rejected') {
            return this.rejectSubmission(request.id, request.notes);
        } else {
            throw new Error('Invalid status. Only "approved" or "rejected" are allowed.');
        }
    }

    deleteSubmission(id: string): Promise<void> {
        return del<void>(API_ROUTES.projectSubmissions.byId(id));
    }
}