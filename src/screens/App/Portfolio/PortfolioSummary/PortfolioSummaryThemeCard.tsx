import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert } from 'react-native';

import Box from 'src/components/Box';
import PortfolioSelectionCard from 'src/components/Cards/PortfolioSelectionCard/PortfolioSelectionCard';
import { IconRound } from 'src/components/Icons/IconRound';
import ListRowTitle from 'src/components/Menu/ListRowTitle';
import Text from 'src/components/Text/Text';
import { getPortfolioThemeDisplayConfig } from 'src/screens/App/Portfolio/Customisation/ThemeSelection/portfolioThemeSelectionConstants';
import { BasePortfolioEnum } from 'src/types/schemaTypes';

interface PortfolioSummaryThemeCardProps {
  basePortfolio: BasePortfolioEnum;
  swissBias: boolean;
}

const PortfolioSummaryThemeCard: React.FC<PortfolioSummaryThemeCardProps> = ({
  basePortfolio,
  swissBias,
}) => {
  const { t } = useTranslation();
  const config = getPortfolioThemeDisplayConfig(basePortfolio);

  const showReadMore = useCallback(() => {
    Alert.alert(
      t(`PortfolioCard.${basePortfolio}.Title`),
      t(`PortfolioDescription.${basePortfolio}.Description`),
    );
  }, [basePortfolio, t]);

  return (
    <Box gap="s">
      <PortfolioSelectionCard
        testID="portfolio-summary-theme-card"
        title={t(`PortfolioCard.${basePortfolio}.Title`)}
        description={t(`PortfolioCard.${basePortfolio}.Description`)}
        image={{ src: config.image }}
        backgroundColor={config.backgroundColor}
        readMore={{ label: t('Commons.ReadMore'), onPress: showReadMore }}
        onPress={showReadMore}
        accessibilityRole="button"
      />

      {swissBias && (
        <Box>
          <ListRowTitle title={t('PortfolioCustomisation.Preferences.Title')} />
          <Box
            backgroundColor="backgroundSurface"
            borderRadius="l"
            paddingHorizontal="s"
            paddingVertical="m"
            flexDirection="row"
            alignItems="center"
            gap="s"
          >
            <IconRound icon="prism" size="medium" />
            <Text variant="secondary" color="textPrimary" fontWeight="600">
              {t('Commons.SwissBias')}
            </Text>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default PortfolioSummaryThemeCard;
