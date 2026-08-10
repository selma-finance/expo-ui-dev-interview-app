import React from 'react';

import Box from 'src/components/Box';
import Icon, { IconName } from 'src/components/Icon';

interface IconRoundProps {
  icon: IconName;
  size?: 'large' | 'medium' | 'small';
}

const CONTAINER_SIZES = {
  large: 48,
  medium: 32,
  small: 24,
};

const IONICON_SIZES = {
  large: 'medium',
  medium: 'small',
  small: 'xsmall',
} as const;

export const IconRound: React.FC<IconRoundProps> = ({ icon, size = 'large' }) => (
  <Box
    borderRadius="round"
    backgroundColor="backgroundIconDefault"
    alignItems="center"
    justifyContent="center"
    width={CONTAINER_SIZES[size]}
    height={CONTAINER_SIZES[size]}
  >
    <Icon name={icon} size={IONICON_SIZES[size]} color="iconBrand" />
  </Box>
);
