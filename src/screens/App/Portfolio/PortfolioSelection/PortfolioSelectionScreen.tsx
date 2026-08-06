import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useCallback, useMemo, useState } from 'react';
import { Alert, useWindowDimensions } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Box from 'src/components/Box';
import Carousel from 'src/components/Carousel/Carousel';
import PortfolioSelectionCard from 'src/components/Cards/PortfolioSelectionCard/PortfolioSelectionCard';
import StepIndicator from 'src/components/StepIndicator/StepIndicator';
import type { PortfolioCustomisationStackParamList } from 'src/navigation/portfolioCustomisationTypes';
import { PortfolioCustomisationFlowContainer } from 'src/screens/App/Portfolio/Customisation/PortfolioCustomisationFlowContainer';
import {
  getPortfolioThemeDisplayConfig,
  PORTFOLIO_TAB_ORDER,
} from 'src/screens/App/Portfolio/Customisation/ThemeSelection/portfolioThemeSelectionConstants';
import type { BasePortfolioEnum } from 'src/types/schemaTypes';

const HEADER_HEIGHT = 48;
const FOOTER_HEIGHT = 140;
const STEP_INDICATOR_HEIGHT = 28;
const MIN_CAROUSEL_HEIGHT = 280;
const MAX_CAROUSEL_HEIGHT = 400;

const PortfolioSelectionScreen: React.FC = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<StackNavigationProp<PortfolioCustomisationStackParamList>>();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { height: windowHeight } = useWindowDimensions();
  const insets = useSafeAreaInsets();

  const carouselHeight = useMemo(() => {
    const availableHeight =
      windowHeight -
      insets.top -
      insets.bottom -
      HEADER_HEIGHT -
      FOOTER_HEIGHT -
      STEP_INDICATOR_HEIGHT;

    return Math.min(MAX_CAROUSEL_HEIGHT, Math.max(MIN_CAROUSEL_HEIGHT, availableHeight));
  }, [windowHeight, insets.top, insets.bottom]);

  const handleContinue = useCallback(() => {
    const theme = PORTFOLIO_TAB_ORDER[selectedIndex] ?? 'CLASSIC';
    navigation.navigate('PortfolioPreferences', { theme });
  }, [navigation, selectedIndex]);

  const showReadMore = useCallback(
    (theme: BasePortfolioEnum) => {
      Alert.alert(
        t(`PortfolioCard.${theme}.Title`),
        t(`PortfolioDescription.${theme}.Description`),
      );
    },
    [t],
  );

  return (
    <PortfolioCustomisationFlowContainer
      title={t('PortfolioCustomisation.PortfolioSelection.TopBar.Title')}
      disclaimer={t('PortfolioCustomisation.PortfolioSelection.Disclaimer')}
      CTA={{ onPress: handleContinue }}
    >
      <Box flex={1} justifyContent="center">
        <Carousel
          testID="portfolio-selection-carousel"
          data={[...PORTFOLIO_TAB_ORDER]}
          height={carouselHeight}
          hideBottomDots
          activeIndex={selectedIndex}
          renderItem={(theme, index) => {
            const config = getPortfolioThemeDisplayConfig(theme);
            const isSelected = index === selectedIndex;

            return (
              <PortfolioSelectionCard
                testID={`portfolio-selection-card-${theme.toLowerCase()}`}
                title={t(`PortfolioCard.${theme}.Title`)}
                description={t(`PortfolioCard.${theme}.Description`)}
                image={{ src: config.image }}
                backgroundColor={config.backgroundColor}
                isSelected={isSelected}
                tag={isSelected ? t('Commons.Active') : undefined}
                readMore={{
                  label: t('Commons.ReadMore'),
                  onPress: () => showReadMore(theme),
                }}
                onPress={() => setSelectedIndex(index)}
              />
            );
          }}
        />
        <Box paddingVertical="xs">
          <StepIndicator currentStep={selectedIndex} totalSteps={PORTFOLIO_TAB_ORDER.length} />
        </Box>
      </Box>
    </PortfolioCustomisationFlowContainer>
  );
};

export default PortfolioSelectionScreen;
