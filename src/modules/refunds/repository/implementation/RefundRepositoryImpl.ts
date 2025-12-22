import { post, get } from '@/core/utils/http/httpClient';
import { API_ROUTES } from '@/core/constant/api';
import type { MarkRefundableRequest } from '../../domain/req/MarkRefundableRequest';
import type { ClaimRefundRequest } from '../../domain/req/ClaimRefundRequest';
import type { GetRefundsByProjectRequest } from '../../domain/req/GetRefundsByProjectRequest';
import type { GetRefundsByUserRequest } from '../../domain/req/GetRefundsByUserRequest';
import type { RefundResponse } from '../../domain/res/RefundResponse';
import type { RefundListResponse } from '../../domain/res/RefundListResponse';
import type { RefundRepository } from '../interface/RefundRepository';

export class RefundRepositoryImpl implements RefundRepository {
    markRefundable(request: MarkRefundableRequest): Promise<RefundResponse> {
        return post<RefundResponse>(API_ROUTES.refunds.markRefundable, request);
    }

    claimRefund(request: ClaimRefundRequest): Promise<RefundResponse> {
        return post<RefundResponse>(API_ROUTES.refunds.claim, request);
    }

    getRefundsByProject(request: GetRefundsByProjectRequest): Promise<RefundListResponse> {
        const params = new URLSearchParams();
        if (request.page !== undefined) params.set('page', String(request.page));
        if (request.limit !== undefined) params.set('limit', String(request.limit));
        if (request.status) params.set('status', request.status);
        const endpoint = params.toString()
            ? `${API_ROUTES.refunds.byProject(request.projectId)}?${params.toString()}`
            : API_ROUTES.refunds.byProject(request.projectId);

        return get<RefundListResponse>(endpoint);
    }

    getRefundsByUser(request: GetRefundsByUserRequest): Promise<RefundListResponse> {
        const params = new URLSearchParams();
        if (request.page !== undefined) params.set('page', String(request.page));
        if (request.limit !== undefined) params.set('limit', String(request.limit));
        if (request.status) params.set('status', request.status);
        const endpoint = params.toString()
            ? `${API_ROUTES.refunds.byUser(request.userId)}?${params.toString()}`
            : API_ROUTES.refunds.byUser(request.userId);

        return get<RefundListResponse>(endpoint);
    }
}