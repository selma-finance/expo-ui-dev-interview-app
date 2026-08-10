import type { BasePortfolioEnum } from 'src/types/schemaTypes';

export type PortfolioCustomisationStackParamList = {
  PortfolioSelection: undefined;
  PortfolioPreferences: { theme: BasePortfolioEnum };
  PortfolioSummary: { theme: BasePortfolioEnum; swissBias: boolean };
};
