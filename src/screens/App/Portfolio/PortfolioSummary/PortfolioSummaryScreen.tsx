import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, ScrollView } from 'react-native';

import AllocationChangeCard from 'src/components/Cards/AllocationChangeCard/AllocationChangeCard';
import CustomerSupportCardSmall from 'src/components/Cards/CustomerSupportCardSmall/CustomerSupportCardSmall';
import Box from 'src/components/Box';
import ListRowTitle from 'src/components/Menu/ListRowTitle';
import {
  getAllocationChanges,
  getPortfolioSummaryStats,
} from 'src/models/InvestmentAllocation/getAllocationChanges';
import type { PortfolioCustomisationStackParamList } from 'src/navigation/portfolioCustomisationTypes';
import { PortfolioCustomisationFlowContainer } from 'src/screens/App/Portfolio/Customisation/PortfolioCustomisationFlowContainer';
import PortfolioSummaryThemeCard from 'src/screens/App/Portfolio/PortfolioSummary/PortfolioSummaryThemeCard';
import CostsCardSummary from 'src/screens/shared/PortfolioCards/CostsCardSummary';
import PortfolioStatsCard from 'src/screens/shared/PortfolioCards/PortfolioStatsCard';

const PortfolioSummaryScreen: React.FC = () => {
  const { t } = useTranslation();
  const navigation =
    useNavigation<StackNavigationProp<PortfolioCustomisationStackParamList>>();
  const route =
    useRoute<RouteProp<PortfolioCustomisationStackParamList, 'PortfolioSummary'>>();

  const { theme, swissBias } = route.params;

  const allocationChanges = useMemo(
    () => getAllocationChanges({ theme, swissBias, t }),
    [theme, swissBias, t],
  );

  const stats = useMemo(
    () => getPortfolioSummaryStats(theme, swissBias),
    [theme, swissBias],
  );

  const handleConfirm = useCallback(() => {
    Alert.alert(
      t('PortfolioCustomisation.PortfolioSummary.SuccessMessage'),
      t('PortfolioCustomisation.PortfolioSummary.SuccessDescription'),
    );
  }, [t]);

  return (
    <PortfolioCustomisationFlowContainer
      title={t('PortfolioCustomisation.PortfolioSummary.PageTitle')}
      CTA={{
        label: t('PortfolioCustomisation.PortfolioSummary.CTA'),
        onPress: handleConfirm,
      }}
      onBackPress={() => navigation.goBack()}
    >
      <ScrollView alwaysBounceVertical={false}>
        <Box paddingHorizontal="s" gap="s" marginTop="s" marginBottom="s">
          <PortfolioSummaryThemeCard basePortfolio={theme} swissBias={swissBias} />

          <Box>
            <ListRowTitle title={t('ThemeSelection.StatsCard.ListRowTitle.Title')} />
            <PortfolioStatsCard
              diversificationLevel={stats.diversificationLevel}
              scoreLevel={stats.scoreLevel}
              testID="portfolio-summary-stats"
              diversificationTestID="portfolio-summary-stat-diversification"
              riskLevelTestID="portfolio-summary-stat-risk-level"
            />
          </Box>

          <Box>
            <ListRowTitle
              title={t('PortfolioCustomisation.PortfolioSummary.AssetAllocationChangesTitle')}
            />
            <AllocationChangeCard assets={allocationChanges} />
          </Box>

          <CostsCardSummary />

          <Box>
            <ListRowTitle title={t('InvestmentPlan.ListRowTitle.Support.Title')} />
            <CustomerSupportCardSmall
              title={t('CustomerSupportCardSmall.Title')}
              linkLabel={t('CustomerSupportCardSmall.Link')}
              onPress={() =>
                Alert.alert(
                  t('CustomerSupportCardSmall.Title'),
                  t('CustomerSupportCardSmall.Description'),
                )
              }
            />
          </Box>
        </Box>
      </ScrollView>
    </PortfolioCustomisationFlowContainer>
  );
};

export default PortfolioSummaryScreen;
