import type { CreateInvestmentRequest } from '../../domain/req/CreateInvestmentRequest';
import type { InvestmentListResponse } from '../../domain/res/InvestmentListResponse';
import type { InvestmentDetailResponse } from '../../domain/res/InvestmentDetailResponse';
import type { InvestmentProfitEntity } from '../../domain/entity/InvestmentProfitEntity';

export interface InvestmentRepository {
    getMyInvestments(): Promise<InvestmentListResponse>;
    getInvestmentsByProject(projectId: string): Promise<InvestmentListResponse>;
    getInvestmentById(id: string): Promise<InvestmentDetailResponse>;
    createInvestment(request: CreateInvestmentRequest): Promise<InvestmentDetailResponse>;
    getInvestmentProfit(investmentId: string): Promise<InvestmentProfitEntity>;
}
