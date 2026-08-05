import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Alert } from 'react-native';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';

import Box from 'src/components/Box';
import BottomActionContainer from 'src/components/BottomContainers/BottomActionContainer/BottomActionContainer';
import KeyboardAwareContainer from 'src/components/Keyboard/KeyboardAwareContainer';
import ScreenHeaderTitle from 'src/components/ScreenHeaderTitle';
import Text from 'src/components/Text/Text';

interface PortfolioCustomisationFlowContainerProps {
  title: string;
  disclaimer?: string;
  onBackPress?: () => void;
  CTA?: {
    label?: string;
    onPress: () => void;
    disabled?: boolean;
  };
}

export const PortfolioCustomisationFlowContainer: React.FC<
  React.PropsWithChildren<PortfolioCustomisationFlowContainerProps>
> = ({ title, disclaimer, onBackPress, CTA, children }) => {
  const { t } = useTranslation();
  const navigation = useNavigation();

  const handleClose = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };

  const showCloseDialog = () =>
    Alert.alert('Leave portfolio selection?', 'Your selection will not be saved.', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Leave', onPress: handleClose },
    ]);

  return (
    <Box flex={1} backgroundColor="backgroundBase">
      <SafeAreaView edges={['top', 'left', 'right']} style={{ flex: 1 }}>
        <KeyboardAwareContainer style={{ flex: 1 }}>
          <ScreenHeaderTitle
            isShownBackBtn
            label={title}
            showCloseButton
            onBackPress={onBackPress}
            onClosePress={showCloseDialog}
          />

          <Box flex={1} style={{ minHeight: 0 }}>
            {children}
          </Box>
        </KeyboardAwareContainer>
      </SafeAreaView>

      <SafeAreaView edges={['bottom']}>
        <Box backgroundColor="backgroundBase">
          {disclaimer && (
            <Box paddingHorizontal="s" paddingBottom="xs">
              <Text variant="secondary" color="textSecondary" textAlign="center">
                {disclaimer}
              </Text>
            </Box>
          )}

          {CTA && (
            <BottomActionContainer
              cta={{
                label: CTA.label ?? t('Commons.Continue'),
                onPress: CTA.onPress,
                disabled: CTA.disabled,
              }}
            />
          )}
        </Box>
      </SafeAreaView>
    </Box>
  );
};
