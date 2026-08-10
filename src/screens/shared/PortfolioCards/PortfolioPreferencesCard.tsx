import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, Pressable } from 'react-native';

import Box from 'src/components/Box';
import CardHeader from 'src/components/Cards/CardHeader/CardHeader';
import { IconRound } from 'src/components/Icons/IconRound';
import Text from 'src/components/Text/Text';

interface PortfolioPreferencesCardProps {
  isSwissBias: boolean;
}

export const PortfolioPreferencesCard: React.FC<PortfolioPreferencesCardProps> = ({
  isSwissBias,
}) => {
  const { t } = useTranslation();

  const showSwissBiasInfo = useCallback(() => {
    Alert.alert(t('Commons.SwissBias'), t('PortfolioCustomisation.Add.SwissBias.Modal'));
  }, [t]);

  if (!isSwissBias) {
    return null;
  }

  return (
    <Box
      backgroundColor="backgroundSurface"
      paddingHorizontal="s"
      paddingVertical="m"
      gap="m"
      borderRadius="l"
    >
      <CardHeader title={t('PortfolioCustomisation.Preferences.Title')} />

      <Pressable onPress={showSwissBiasInfo}>
        <Box gap="offsetXs" flexDirection="row" alignItems="center">
          <IconRound icon="prism" />
          <Text variant="secondary" color="textPrimary">
            {t('Commons.SwissBias')}
          </Text>
        </Box>
      </Pressable>
    </Box>
  );
};
