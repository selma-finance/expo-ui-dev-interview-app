import React from 'react';
import { useTranslation } from 'react-i18next';

import StatsCard from 'src/components/Cards/StatsCard/StatsCard';
import { AllocationDiversification, RiskScoreLevel } from 'src/types/schemaTypes';

interface PortfolioStatsCardProps {
  diversificationLevel: AllocationDiversification;
  scoreLevel: RiskScoreLevel;
  testID: string;
  diversificationTestID?: string;
  riskLevelTestID?: string;
}

const PortfolioStatsCard: React.FC<PortfolioStatsCardProps> = ({
  diversificationLevel,
  scoreLevel,
  testID,
  diversificationTestID,
  riskLevelTestID,
}) => {
  const { t } = useTranslation();

  return (
    <StatsCard
      testID={testID}
      items={[
        {
          label: t('PortfolioCustomisation.Diversification.Title'),
          value: t(`PortfolioCustomisation.DiversificationLevel.${diversificationLevel}`),
          testID: diversificationTestID,
        },
        {
          label: t('PortfolioCustomisation.RiskLevel.Title'),
          value: t(`PortfolioCustomisation.RiskLevel.Header.${scoreLevel}`),
          testID: riskLevelTestID,
        },
      ]}
    />
  );
};

export default PortfolioStatsCard;
