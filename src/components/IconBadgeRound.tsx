import { ResponsiveValue } from '@shopify/restyle';
import React from 'react';
import iconSize from 'src/styling/iconSize';
import { Theme } from 'src/styling/restyle/defaultTheme';

import Box from './Box';

export enum BadgeOpacity {
  HAZY = 0.2,
  SEMI_TRANSPARENT = 0.5,
  OPAQUE = 1,
}

interface IconBadgeRoundProps {
  testID?: string;
  badgeColor?: ResponsiveValue<keyof Theme['colors'], Theme['breakpoints']>;
  badgeOpacityLevel?: BadgeOpacity;
}

const IconBadgeRound: React.FC<IconBadgeRoundProps> = ({
  badgeOpacityLevel = BadgeOpacity.OPAQUE,
  badgeColor = 'iconAlert',
  testID,
}) => {
  return (
    <Box
      testID={testID}
      width={iconSize.xsmall}
      height={iconSize.xsmall}
      justifyContent="center"
      alignItems="center"
    >
      <Box
        width={iconSize.xsmall - 2}
        height={iconSize.xsmall - 2}
        borderRadius="round"
        backgroundColor={badgeColor}
        opacity={badgeOpacityLevel}
      />
    </Box>
  );
};

export default IconBadgeRound;
