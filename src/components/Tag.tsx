import React from 'react';

import { PressableBox } from './Button/PressableButton';
import Text from './Text/Text';
import { Theme } from 'src/styling/restyle/defaultTheme';
import { ResponsiveValue } from '@shopify/restyle';

export interface TagProps {
  testID?: string;
  label: string;
  withBackground?: boolean;
  inverted?: boolean;
  onPress?: () => void;
}

const Tag: React.FC<TagProps> = ({
  testID,
  label,
  withBackground = true,
  inverted = false,
  onPress,
}) => {
  const backgroundColorProp: {
    backgroundColor?: ResponsiveValue<keyof Theme['colors'], Theme['breakpoints']>;
  } = {};
  let textColor: ResponsiveValue<keyof Theme['colors'], Theme['breakpoints']> = 'textActive';

  if (withBackground && !inverted) {
    backgroundColorProp.backgroundColor = 'backgroundTagDefault';
    textColor = 'textTagDefault';
  } else if (withBackground && inverted) {
    backgroundColorProp.backgroundColor = 'backgroundTagInverted';
    textColor = 'textTagInverted';
  }

  return (
    <PressableBox
      testID={testID ?? `${label.toLowerCase().replaceAll(' ', '-')}-tag`}
      {...backgroundColorProp}
      borderRadius="m"
      paddingHorizontal="xs"
      paddingVertical="xxs"
      alignSelf="flex-start"
      onPress={() => onPress?.()}
    >
      <Text variant="tertiary" fontWeight="600" color={textColor}>
        {label}
      </Text>
    </PressableBox>
  );
};

export default Tag;
