import { get, post } from '@/core/utils/http/httpClient';
import { API_ROUTES } from '@/core/constant/api';
import type { CreateInvestmentRequest } from '../../domain/req/CreateInvestmentRequest';
import type { InvestmentListResponse } from '../../domain/res/InvestmentListResponse';
import type { InvestmentDetailResponse } from '../../domain/res/InvestmentDetailResponse';
import type { InvestmentProfitEntity } from '../../domain/entity/InvestmentProfitEntity';
import type { InvestmentRepository } from '../interface/InvestmentRepository';

export class InvestmentRepositoryImpl implements InvestmentRepository {
    getMyInvestments(): Promise<InvestmentListResponse> {
        return get<InvestmentListResponse>(API_ROUTES.investments.my);
    }

    getInvestmentsByProject(projectId: string): Promise<InvestmentListResponse> {
        return get<InvestmentListResponse>(API_ROUTES.investments.byProject(projectId));
    }

    getInvestmentById(id: string): Promise<InvestmentDetailResponse> {
        return get<InvestmentDetailResponse>(API_ROUTES.investments.byId(id));
    }

    createInvestment(request: CreateInvestmentRequest): Promise<InvestmentDetailResponse> {
        return post<InvestmentDetailResponse>(API_ROUTES.investments.root, request);
    }

    getInvestmentProfit(investmentId: string): Promise<InvestmentProfitEntity> {
        return get<InvestmentProfitEntity>(API_ROUTES.investments.profit(investmentId));
    }
}
