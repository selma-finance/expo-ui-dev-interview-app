import React from 'react';
import type { StyleProp, ViewStyle } from 'react-native';

import Box from 'src/components/Box';
import { PressableBox } from 'src/components/Button/PressableButton';
import Link from 'src/components/Link';
import { Checkbox } from 'src/components/Selectors/Checkbox/Checkbox';
import Tag from 'src/components/Tag';
import Text from 'src/components/Text/Text';
import borderWidth from 'src/styling/borderWidth';
import { Testable } from 'src/utils/testable';

interface SelectorLargeProps extends Testable {
  title: string;
  description: string;
  isActive: boolean;
  disabled?: boolean;
  tag?: string;
  link?: {
    label: string;
    onPress: () => void;
  };
  onPress: () => void;
  fillHeight?: boolean;
  style?: StyleProp<ViewStyle>;
}

export const SelectorLarge: React.FC<SelectorLargeProps> = ({
  testID,
  title,
  description,
  isActive,
  disabled,
  tag,
  link,
  onPress,
  fillHeight,
  style,
}) => {
  return (
    <PressableBox
      flex={fillHeight ? 1 : undefined}
      testID={`selector-large-${testID}`}
      onPress={() => !disabled && onPress()}
      accessibilityRole="checkbox"
      accessibilityState={{ checked: isActive, disabled }}
      accessibilityLabel={title}
      style={style}
    >
      <Box
        flex={fillHeight ? 1 : undefined}
        backgroundColor="backgroundSurface"
        padding="s"
        borderWidth={borderWidth.s}
        borderColor={isActive ? 'borderActive' : 'borderDefault'}
        borderRadius="m"
      >
        <Box flexDirection="row" gap="s" alignItems="center">
          <Checkbox testID={`${testID}.checkbox`} isActive={isActive} disabled={disabled} />
          <Box flex={1} gap="xs">
            <Box flexDirection="row" justifyContent="space-between" alignItems="center">
              <Text variant="primary" color="textPrimary" fontWeight="600" flexShrink={1} numberOfLines={1}>
                {title}
              </Text>
              {tag && <Tag label={tag} />}
            </Box>
            <Text variant="tertiary" color="textSecondary">
              {description}
            </Text>
            {link && <Link label={link.label} onPress={link.onPress} />}
          </Box>
        </Box>
      </Box>
    </PressableBox>
  );
};
