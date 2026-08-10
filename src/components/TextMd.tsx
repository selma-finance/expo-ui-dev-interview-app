import { useTheme } from '@shopify/restyle';
import React, { ReactNode } from 'react';
import { Linking, TextStyle } from 'react-native';
import Markdown, { MarkdownProps } from 'react-native-markdown-display';
import { Colors } from 'src/models/Colors';
import { fontFamily } from 'src/styling/font';
import { Theme } from 'src/styling/restyle/defaultTheme';
import spacing from 'src/styling/spacing';

import Box from './Box';

interface MDTextProps extends MarkdownProps {
  variant: 'primary' | 'secondary' | 'tertiary';
  children: ReactNode;
  textAlign?: TextStyle['textAlign'];
  color?: Colors;
  testID?: string;
  bottomSpacing?: number;
}

function onMarkdownLinkPress(url: string) {
  void Linking.openURL(url);
  return false;
}

const TextMd: React.FC<MDTextProps> = ({
  children,
  variant,
  color,
  textAlign,
  bottomSpacing = spacing.s,
  style,
  onLinkPress = onMarkdownLinkPress,
  mergeStyle = true,
  ...rest
}: MDTextProps) => {
  const { textVariants, colors: restyleColors } = useTheme<Theme>();

  const getColor = (color?: Colors) => (color ? restyleColors[color] : restyleColors.textPrimary);
  const labelColor = getColor('textPrimary');
  return (
    <Box {...rest}>
      <Markdown
        mergeStyle={mergeStyle}
        style={{
          body: {
            ...textVariants[variant],
            color: getColor(color),
            textAlign,
            marginBottom: bottomSpacing,
          },
          heading1: { ...textVariants.h1, color: labelColor },
          heading2: { ...textVariants.h2, color: labelColor },
          heading3: { ...textVariants.h3, color: labelColor },
          strong: { fontFamily: fontFamily.fontBold },
          list_item: { marginBottom: bottomSpacing },
          link: { color: getColor('textActive'), textDecorationLine: 'none' },
          ...style,
        }}
        onLinkPress={onLinkPress}
      >
        {children}
      </Markdown>
    </Box>
  );
};

export default TextMd;
