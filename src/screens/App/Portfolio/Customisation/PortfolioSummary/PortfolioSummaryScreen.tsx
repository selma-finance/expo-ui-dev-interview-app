import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, ScrollView } from 'react-native';

import AllocationChangeCard from 'src/components/Cards/AllocationChangeCard/AllocationChangeCard';
import CustomerSupportCard from 'src/components/CustomerSupportCard/CustomerSupportCard';
import Box from 'src/components/Box';
import ListRowTitle from 'src/components/Menu/ListRowTitle';
import { getAllocationChanges } from 'src/models/InvestmentAllocation/getAllocationChanges';
import type { PortfolioCustomisationStackParamList } from 'src/navigation/portfolioCustomisationTypes';
import { PortfolioCustomisationFlowContainer } from 'src/screens/App/Portfolio/Customisation/PortfolioCustomisationFlowContainer';
import PortfolioSummaryCard from 'src/screens/App/Portfolio/Customisation/PortfolioSummary/PortfolioSummaryCard';
import CostsCardSummary from 'src/screens/shared/PortfolioCards/CostsCardSummary';
import { PortfolioPreferencesCard } from 'src/screens/shared/PortfolioCards/PortfolioPreferencesCard';

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
          <PortfolioSummaryCard basePortfolio={theme} swissBias={swissBias} />

          <PortfolioPreferencesCard isSwissBias={swissBias} />

          <Box>
            <ListRowTitle
              title={t('PortfolioCustomisation.PortfolioSummary.AssetAllocationChangesTitle')}
            />
            <AllocationChangeCard assets={allocationChanges} />
          </Box>

          <CostsCardSummary />

          <Box>
            <ListRowTitle title={t('InvestmentPlan.ListRowTitle.Support.Title')} />
            <CustomerSupportCard
              onPress={() =>
                Alert.alert(
                  t('CustomerSupportCard.Title'),
                  t('CustomerSupportCard.Description'),
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
