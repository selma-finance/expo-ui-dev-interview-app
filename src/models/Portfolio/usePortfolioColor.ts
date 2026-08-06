import { useTheme } from '@shopify/restyle';

import { Colors } from 'src/models/Colors';
import { PortfolioCategoryKey } from 'src/types/schemaTypes';
import { Theme } from 'src/styling/restyle/defaultTheme';

const categoryColorMap: Record<PortfolioCategoryKey, Colors> = {
  cash: 'portfolioCash',
  commodities: 'portfolioCommodities',
  corporate_bonds: 'portfolioCorporateBonds',
  crypto: 'portfolioCrypto',
  equity: 'portfolioEquity',
  government_bonds: 'portfolioGovernmentBonds',
  precious_metals: 'portfolioPreciousMetals',
  private_equity: 'portfolioPrivateEquity',
  real_estate: 'portfolioRealEstate',
  swiss_equity: 'portfolioSwissEquity',
};

const getPortfolioColor = (
  portfolioCategory: PortfolioCategoryKey | undefined,
): Colors => {
  if (!portfolioCategory) {
    return 'portfolioOther';
  }
  return categoryColorMap[portfolioCategory] ?? 'portfolioOther';
};

export function useGetPortfolioColor(): (
  portfolioCategory?: PortfolioCategoryKey,
) => Colors {
  useTheme<Theme>();
  return getPortfolioColor;
}
