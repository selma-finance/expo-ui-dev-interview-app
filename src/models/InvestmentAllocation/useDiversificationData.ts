import { useTranslation } from 'react-i18next';

import { AllocationDiversification } from 'src/types/schemaTypes';

const TOTAL_DIVERSIFICATION_LEVELS = 4;

interface PortfolioDiversificationData {
  levelTitle: string;
  levelDescription: string;
  levelNumber: number;
  totalLevels: number;
}

export const useDiversificationData = (
  diversificationLevel: AllocationDiversification,
): PortfolioDiversificationData => {
  const { t } = useTranslation();

  return {
    levelTitle: t(`PortfolioCustomisation.DiversificationLevel.${diversificationLevel}`),
    levelDescription: t(
      `PortfolioCustomisation.DiversificationDescription.${diversificationLevel}`,
    ),
    levelNumber: diversificationLevel === 'GOOD' ? 3 : 4,
    totalLevels: TOTAL_DIVERSIFICATION_LEVELS,
  };
};
