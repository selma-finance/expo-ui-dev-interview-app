import Ionicons from '@expo/vector-icons/Ionicons';
import { ColorProps, useTheme } from '@shopify/restyle';
import React from 'react';
import { StyleProp, TextStyle } from 'react-native';
import iconSizeMap from 'src/styling/iconSize';
import { Theme } from 'src/styling/restyle/defaultTheme';

export type IconName = keyof typeof Ionicons.glyphMap;

export type IconSize = keyof typeof iconSizeMap;

export interface IconProps extends ColorProps<Theme> {
  name: IconName;
  size: IconSize;
  testID?: string;
  style?: StyleProp<TextStyle>;
}

const Icon: React.FC<IconProps> = ({ size, color = 'textSecondary', ...rest }) => {
  const { colors } = useTheme();
  return <Ionicons size={iconSizeMap[size]} color={colors[color]} {...rest} />;
};

export default Icon;
