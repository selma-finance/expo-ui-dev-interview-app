import {
  createRestyleComponent,
  createRestyleFunction,
  createText,
  VariantProps,
} from '@shopify/restyle';
import React from 'react';
import { fontFamily } from 'src/styling/font';
import { Theme } from 'src/styling/restyle/defaultTheme';

const RestyleText = createText<Theme>();

// https://reactnative.dev/docs/0.66/text-style-props#fontweight not all implemented
type FontWeight = '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | 'normal' | 'bold';

const fontWeightToFontFamily: Record<FontWeight, string> = {
  '100': fontFamily.fontRegular,
  '200': fontFamily.fontRegular,
  '300': fontFamily.fontRegular,
  '400': fontFamily.fontRegular,
  '500': fontFamily.fontMedium,
  '600': fontFamily.fontSemiBold,
  '700': fontFamily.fontBold,
  '800': fontFamily.fontBold,
  normal: fontFamily.fontRegular,
  bold: fontFamily.fontBold,
};

const customFontWeight = createRestyleFunction({
  property: 'fontWeight',
  styleProperty: 'fontFamily',
  transform: ({ value }: { value: FontWeight }) =>
    value in fontWeightToFontFamily ? fontWeightToFontFamily[value] : fontFamily.fontRegular,
});

export type TextProps = VariantProps<Theme, 'textVariants'> &
  React.ComponentProps<typeof RestyleText> & {
    fontWeight?: FontWeight;
  };

const Text = createRestyleComponent<TextProps, Theme>([customFontWeight], RestyleText);

export default Text;
