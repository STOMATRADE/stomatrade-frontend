import type { PortfolioEntity } from '../entity/PortfolioEntity';
import type { PortfolioAssetEntity } from '../entity/PortfolioAssetEntity';

export type PortfolioDetailResponse = {
    portfolio: PortfolioEntity;
    assets: PortfolioAssetEntity[];
};
