import { useTranslation } from 'react-i18next';

import { RiskScoreLevel } from 'src/types/schemaTypes';

const riskScoreLevelsSorted: RiskScoreLevel[] = [
  'OPTION_1_STABILITY',
  'OPTION_2_CAUTIOUS_GROWTH',
  'OPTION_3_WELL_BALANCED',
  'OPTION_4_GROWTH',
  'OPTION_5_STRONG_GROWTH',
  'OPTION_6_FULL_GROWTH',
];

interface PortfolioRiskScoreData {
  levelTitle: string;
  levelDescription: string;
  levelNumber: number;
  totalLevels: number;
}

const getLevelNumber = (scoreLevel: RiskScoreLevel): number =>
  riskScoreLevelsSorted.indexOf(scoreLevel) + 1;

export const useRiskScoreLevelData = (scoreLevel: RiskScoreLevel): PortfolioRiskScoreData => {
  const { t } = useTranslation();

  return {
    levelTitle: t(`PortfolioCustomisation.RiskLevel.Header.${scoreLevel}`),
    levelDescription: t(`PortfolioCustomisation.RiskLevel.Description.${scoreLevel}`),
    levelNumber: getLevelNumber(scoreLevel),
    totalLevels: riskScoreLevelsSorted.length,
  };
};
