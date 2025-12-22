import type { CreateInvestmentRequest } from '../../domain/req/CreateInvestmentRequest';
import type { GetInvestmentsRequest } from '../../domain/req/GetInvestmentsRequest';
import type { InvestmentListResponse } from '../../domain/res/InvestmentListResponse';
import type { InvestmentDetailResponse } from '../../domain/res/InvestmentDetailResponse';
import type { InvestmentProjectStatsResponse } from '../../domain/res/InvestmentProjectStatsResponse';

export interface InvestmentRepository {
    getInvestments(request: GetInvestmentsRequest): Promise<InvestmentListResponse>;
    getProjectStats(projectId: string): Promise<InvestmentProjectStatsResponse>;
    getInvestmentById(id: string): Promise<InvestmentDetailResponse>;
    createInvestment(request: CreateInvestmentRequest): Promise<InvestmentDetailResponse>;
}
