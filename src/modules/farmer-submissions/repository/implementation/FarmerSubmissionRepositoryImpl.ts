import { get, post, patch, del } from '@/core/utils/http/httpClient';
import { API_ROUTES } from '@/core/constant/api';
import type { CreateFarmerSubmissionRequest } from '../../domain/req/CreateFarmerSubmissionRequest';
import type { GetFarmerSubmissionsRequest } from '../../domain/req/GetFarmerSubmissionsRequest';
import type { GetFarmerSubmissionByIdRequest } from '../../domain/req/GetFarmerSubmissionByIdRequest';
import type { ReviewFarmerSubmissionRequest } from '../../domain/req/ReviewFarmerSubmissionRequest';
import type { FarmerSubmissionResponse } from '../../domain/res/FarmerSubmissionResponse';
import type { FarmerSubmissionListResponse } from '../../domain/res/FarmerSubmissionListResponse';
import type { FarmerSubmissionRepository } from '../interface/FarmerSubmissionRepository';

export class FarmerSubmissionRepositoryImpl implements FarmerSubmissionRepository {
    createSubmission(request: CreateFarmerSubmissionRequest): Promise<FarmerSubmissionResponse> {
        return post<FarmerSubmissionResponse>(API_ROUTES.farmerSubmissions.root, request);
    }

    getSubmissions(request: GetFarmerSubmissionsRequest): Promise<FarmerSubmissionListResponse> {
        const params = new URLSearchParams();
        if (request.page !== undefined) params.set('page', String(request.page));
        if (request.limit !== undefined) params.set('limit', String(request.limit));
        if (request.status) params.set('status', request.status);
        const endpoint = params.toString()
            ? `${API_ROUTES.farmerSubmissions.root}?${params.toString()}`
            : API_ROUTES.farmerSubmissions.root;

        return get<FarmerSubmissionListResponse>(endpoint);
    }

    getSubmissionById(request: GetFarmerSubmissionByIdRequest): Promise<FarmerSubmissionResponse> {
        return get<FarmerSubmissionResponse>(API_ROUTES.farmerSubmissions.byId(request.id));
    }

    approveSubmission(id: string, notes?: string): Promise<FarmerSubmissionResponse> {
        return patch<FarmerSubmissionResponse>(API_ROUTES.farmerSubmissions.approve(id), { notes });
    }

    rejectSubmission(id: string, notes?: string): Promise<FarmerSubmissionResponse> {
        return patch<FarmerSubmissionResponse>(API_ROUTES.farmerSubmissions.reject(id), { notes });
    }

    updateSubmission(request: ReviewFarmerSubmissionRequest): Promise<FarmerSubmissionResponse> {
        if (request.status === 'approved') {
            return this.approveSubmission(request.id, request.notes);
        } else if (request.status === 'rejected') {
            return this.rejectSubmission(request.id, request.notes);
        } else {
            throw new Error('Invalid status. Only "approved" or "rejected" are allowed.');
        }
    }

    deleteSubmission(id: string): Promise<void> {
        return del<void>(API_ROUTES.farmerSubmissions.byId(id));
    }
}