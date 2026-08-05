import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useCallback, useState } from 'react';
import { Alert } from 'react-native';
import { useTranslation } from 'react-i18next';

import Box from 'src/components/Box';
import { SelectorLarge } from 'src/components/Selectors/SelectorLarge/SelectorLarge';
import Text from 'src/components/Text/Text';
import type { PortfolioCustomisationStackParamList } from 'src/navigation/portfolioCustomisationTypes';
import { PortfolioCustomisationFlowContainer } from 'src/screens/App/Portfolio/Customisation/PortfolioCustomisationFlowContainer';

const PortfolioPreferencesScreen: React.FC = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<StackNavigationProp<PortfolioCustomisationStackParamList>>();
  const route = useRoute<RouteProp<PortfolioCustomisationStackParamList, 'PortfolioPreferences'>>();
  const [swissBiasEnabled, setSwissBiasEnabled] = useState(true);

  const showReadMore = useCallback(() => {
    Alert.alert(t('Commons.SwissBias'), t('PortfolioCustomisation.Add.SwissBias.Modal'));
  }, [t]);

  const handleContinue = useCallback(() => {
    Alert.alert(
      'Portfolio summary',
      `Theme: ${route.params.theme}\nSwiss bias: ${swissBiasEnabled ? 'enabled' : 'disabled'}`,
    );
  }, [route.params.theme, swissBiasEnabled]);

  return (
    <PortfolioCustomisationFlowContainer
      title={t('PortfolioCustomisation.Preferences.TopBar.Title')}
      disclaimer={t('PortfolioCustomisation.PortfolioSelection.Disclaimer')}
      CTA={{ onPress: handleContinue }}
      onBackPress={() => navigation.goBack()}
    >
      <Box flex={1} paddingHorizontal="s" paddingTop="m" gap="m">
        <Box gap="xs">
          <Text variant="h2" color="textPrimary">
            {t('PortfolioCustomisation.Preferences.Title')}
          </Text>
          <Text variant="secondary" color="textSecondary">
            {t('PortfolioCustomisation.Preferences.Description')}
          </Text>
        </Box>

        <SelectorLarge
          testID="swiss-bias"
          title={t('Commons.SwissBias')}
          description={t('PortfolioCustomisation.Preferences.SwissBias.Description')}
          isActive={swissBiasEnabled}
          onPress={() => setSwissBiasEnabled(current => !current)}
          link={{
            label: t('Commons.ReadMore'),
            onPress: showReadMore,
          }}
        />
      </Box>
    </PortfolioCustomisationFlowContainer>
  );
};

export default PortfolioPreferencesScreen;
