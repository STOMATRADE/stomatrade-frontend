import { get, post } from '@/core/utils/http/httpClient';
import { API_ROUTES } from '@/core/constant/api';
import type { CreateInvestmentRequest } from '../../domain/req/CreateInvestmentRequest';
import type { GetInvestmentsRequest } from '../../domain/req/GetInvestmentsRequest';
import type { InvestmentListResponse } from '../../domain/res/InvestmentListResponse';
import type { InvestmentDetailResponse } from '../../domain/res/InvestmentDetailResponse';
import type { InvestmentProjectStatsResponse } from '../../domain/res/InvestmentProjectStatsResponse';
import type { InvestmentRepository } from '../interface/InvestmentRepository';

export class InvestmentRepositoryImpl implements InvestmentRepository {
    getInvestments(request: GetInvestmentsRequest): Promise<InvestmentListResponse> {
        const params = new URLSearchParams();
        if (request.userId) params.set('userId', request.userId);
        if (request.projectId) params.set('projectId', request.projectId);
        const endpoint = params.toString()
            ? `${API_ROUTES.investments.root}?${params.toString()}`
            : API_ROUTES.investments.root;

        return get<InvestmentListResponse>(endpoint);
    }

    getProjectStats(projectId: string): Promise<InvestmentProjectStatsResponse> {
        return get<InvestmentProjectStatsResponse>(API_ROUTES.investments.projectStats(projectId));
    }

    getInvestmentById(id: string): Promise<InvestmentDetailResponse> {
        return get<InvestmentDetailResponse>(API_ROUTES.investments.byId(id));
    }

    createInvestment(request: CreateInvestmentRequest): Promise<InvestmentDetailResponse> {
        return post<InvestmentDetailResponse>(API_ROUTES.investments.root, request);
    }
}
