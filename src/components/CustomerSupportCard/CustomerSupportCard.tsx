import { useTheme } from '@shopify/restyle';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Image } from 'react-native';

import PressableButton from 'src/components/Button/PressableButton';
import Box from 'src/components/Box';
import Text from 'src/components/Text/Text';
import borderWidth from 'src/styling/borderWidth';
import { Theme } from 'src/styling/restyle/defaultTheme';

export enum CustomerSupportCardBackgroundStyle {
  SURFACE = 'white',
  TRANSPARENT = 'transparent',
}

interface CustomerSupportCardProps {
  hasBorder?: boolean;
  backgroundStyle?: CustomerSupportCardBackgroundStyle;
  onPress: () => void;
}

const CustomerSupportCard: React.FC<CustomerSupportCardProps> = ({
  hasBorder = false,
  backgroundStyle = CustomerSupportCardBackgroundStyle.SURFACE,
  onPress,
}) => {
  const { t } = useTranslation();
  const { images } = useTheme<Theme>();

  return (
    <PressableButton onPress={onPress} accessibilityRole="button">
      <Box
        backgroundColor={
          backgroundStyle === CustomerSupportCardBackgroundStyle.SURFACE
            ? 'backgroundSurface'
            : undefined
        }
        borderColor={hasBorder ? 'borderDefault' : undefined}
        borderWidth={hasBorder ? borderWidth.s : undefined}
        paddingVertical="m"
        paddingHorizontal="s"
        borderRadius="l"
      >
        <Box marginBottom="m">
          <Image
            style={{ height: 48, width: '50%', resizeMode: 'contain' }}
            source={images.customerSupport}
          />
        </Box>

        <Text variant="primary" fontWeight="bold" marginBottom="xs" color="textPrimary">
          {t('CustomerSupportCard.Title')}
        </Text>

        <Text variant="secondary" fontWeight="500" marginBottom="offsetXs" color="textSecondary">
          {t('CustomerSupportCard.Description')}
        </Text>
        <Text variant="secondary" color="linkActive" fontWeight="600">
          {t('CustomerSupportCard.ContactLink')}
        </Text>
      </Box>
    </PressableButton>
  );
};

export default CustomerSupportCard;
