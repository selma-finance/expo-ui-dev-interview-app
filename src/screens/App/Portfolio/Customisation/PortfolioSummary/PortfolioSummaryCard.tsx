import React, { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert } from 'react-native';
import { useTheme } from '@shopify/restyle';

import PortfolioCard from 'src/components/Cards/PortfolioCard/PortfolioCard';
import { PortfolioCardDetailsProps } from 'src/components/Cards/PortfolioCardDetails/PortfolioCardDetails';
import { PieChartProps } from 'src/components/Chart/PieChart';
import {
  getPortfolioSummaryStats,
  getSimulatedAllocations,
} from 'src/models/InvestmentAllocation/getAllocationChanges';
import { useDiversificationData } from 'src/models/InvestmentAllocation/useDiversificationData';
import { useGetPortfolioColor } from 'src/models/Portfolio/usePortfolioColor';
import { useRiskScoreLevelData } from 'src/models/RiskMetrics/useRiskScoreLevelData';
import { Theme } from 'src/styling/restyle/defaultTheme';
import { BasePortfolioEnum } from 'src/types/schemaTypes';

interface PortfolioSummaryCardProps {
  basePortfolio: BasePortfolioEnum;
  swissBias: boolean;
}

const PortfolioSummaryCard: React.FC<PortfolioSummaryCardProps> = ({
  basePortfolio,
  swissBias,
}) => {
  const { t } = useTranslation();
  const { colors } = useTheme<Theme>();
  const getPortfolioColor = useGetPortfolioColor();

  const stats = useMemo(
    () => getPortfolioSummaryStats(basePortfolio, swissBias),
    [basePortfolio, swissBias],
  );

  const diversificationData = useDiversificationData(stats.diversificationLevel);
  const riskScoreLevelData = useRiskScoreLevelData(stats.scoreLevel);

  const showPortfolioDescription = useCallback(() => {
    Alert.alert(
      t(`PortfolioCard.${basePortfolio}.Title`),
      t(`PortfolioDescription.${basePortfolio}.Description`),
    );
  }, [basePortfolio, t]);

  const showDiversificationInfo = useCallback(() => {
    Alert.alert(
      t('PortfolioCustomisation.Diversification.Title'),
      diversificationData.levelDescription,
    );
  }, [diversificationData.levelDescription, t]);

  const showRiskLevelInfo = useCallback(() => {
    Alert.alert(t('PortfolioCustomisation.RiskLevel.Title'), riskScoreLevelData.levelDescription);
  }, [riskScoreLevelData.levelDescription, t]);

  const pieChartProps: PieChartProps = useMemo(() => {
    const allocations = getSimulatedAllocations(basePortfolio, swissBias);

    return {
      data: allocations.map((allocation) => ({
        value: allocation.percentage,
        color: colors[getPortfolioColor(allocation.portfolioCategoryKey)],
        label: allocation.portfolioCategoryKey,
      })),
    };
  }, [basePortfolio, colors, getPortfolioColor, swissBias]);

  const diversificationCardOptions: PortfolioCardDetailsProps = {
    title: t('PortfolioCustomisation.Diversification.Title'),
    level: diversificationData.levelTitle,
    currentStep: diversificationData.levelNumber,
    totalSteps: diversificationData.totalLevels,
    onPress: showDiversificationInfo,
  };

  const riskLevelCardOptions: PortfolioCardDetailsProps = {
    title: t('PortfolioCustomisation.RiskLevel.Title'),
    level: riskScoreLevelData.levelTitle,
    currentStep: riskScoreLevelData.levelNumber,
    totalSteps: riskScoreLevelData.totalLevels,
    onPress: showRiskLevelInfo,
  };

  return (
    <PortfolioCard
      cardHeaderProps={{ title: t(`PortfolioCard.${basePortfolio}.Title`) }}
      description={t(`PortfolioCard.${basePortfolio}.Description`)}
      pieChartProps={pieChartProps}
      diversificationCardProps={diversificationCardOptions}
      riskLevelCardProps={riskLevelCardOptions}
      descriptionLinkProps={{
        label: t('Commons.ReadMore'),
        onPress: showPortfolioDescription,
      }}
    />
  );
};

export default PortfolioSummaryCard;
