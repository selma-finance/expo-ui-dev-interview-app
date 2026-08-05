import { ParamListBase, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { ReactElement } from 'react';

import Box from './Box';
import PressableButton from './Button/PressableButton';
import CardHeaderButton from 'src/components/Card/CardHeaderButton';
import Icon from './Icon';
import Text from './Text/Text';
import { Colors } from 'src/models/Colors';

export interface ScreenHeaderTitleProps extends React.ComponentProps<typeof Box> {
  backBtnLabel?: string;
  isShownBackBtn?: boolean;
  label?: string;
  labelColor?: Colors;
  doNotCenterLabel?: boolean;
  showCloseButton?: boolean;
  leftAction?: ReactElement;
  title?: ReactElement;
  rightAction?: ReactElement;
  onPress?: () => void;
  onClosePress?: () => void;
  onBackPress?: () => void;
}

const ScreenHeaderTitle: React.FC<ScreenHeaderTitleProps> = ({
  isShownBackBtn,
  backBtnLabel,
  label,
  labelColor,
  doNotCenterLabel,
  showCloseButton,
  onClosePress,
  onBackPress,
  leftAction,
  title,
  rightAction,
  ...rest
}: ScreenHeaderTitleProps) => {
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

  const onBackButtonPress = () => {
    if (onBackPress) {
      onBackPress();
    } else if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };

  return (
    <Box
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between"
      paddingVertical="xs"
      paddingHorizontal="s"
      {...rest}
    >
      <>
        <Box flex={doNotCenterLabel ? undefined : 1} alignItems="flex-start">
          {leftAction}
          {!leftAction && isShownBackBtn && (
            <PressableButton
              testID="nav-back-button"
              onPress={onBackButtonPress}
              hitSlop={20}
              accessibilityRole="button"
            >
              <Box flexDirection="row" justifyContent="center" alignItems="center">
                <Icon name="chevron-back-outline" color="textPrimary" size="medium" />
                {backBtnLabel && (
                  <Text variant="tertiary" color="textPrimary" fontWeight="600">
                    {backBtnLabel}
                  </Text>
                )}
              </Box>
            </PressableButton>
          )}
        </Box>
        <Box flex={doNotCenterLabel ? 1 : 5}>
          {title}
          {!title && (
            <Text
              testID="nav-title-label"
              variant="secondary"
              color={labelColor ?? 'textPrimary'}
              fontWeight="bold"
              textAlign="center"
            >
              {label}
            </Text>
          )}
        </Box>
        <Box flex={1} flexDirection="row" justifyContent="flex-end">
          {rightAction}
          {!rightAction && showCloseButton && (
            <CardHeaderButton key="close" testID="nav-close-button" onPress={onClosePress}>
              <Icon name="close" color="textPrimary" size="medium" />
            </CardHeaderButton>
          )}
        </Box>
      </>
    </Box>
  );
};

export default ScreenHeaderTitle;
