import React from 'react';
import { useTheme } from '@shopify/restyle';

import Box from 'src/components/Box';
import ProgressBar from 'src/components/ProgressBar';
import Text from 'src/components/Text/Text';
import { useGetPortfolioColor } from 'src/models/Portfolio/usePortfolioColor';
import { Theme } from 'src/styling/restyle/defaultTheme';
import { PortfolioCategoryKey } from 'src/types/schemaTypes';
import { useFormatPercentage } from 'src/utils/useFormatPercentage';

export interface AllocationVisualisationProps {
  variant: 'labeled' | 'trailing-percentage' | 'bar-only';
  percentage: number;
  portfolioCategory: PortfolioCategoryKey;
  isInactive?: boolean;
  label?: string;
}

const AllocationVisualisation: React.FC<AllocationVisualisationProps> = ({
  variant,
  label,
  percentage,
  portfolioCategory,
  isInactive = false,
}) => {
  const formatPercentage = useFormatPercentage();
  const getPortfolioColor = useGetPortfolioColor();
  const { colors } = useTheme<Theme>();
  const backgroundColor = isInactive
    ? colors.backgroundDisabled
    : colors[getPortfolioColor(portfolioCategory)];

  const testID =
    variant === 'labeled'
      ? `${portfolioCategory}-${label}-allocation`
      : `${portfolioCategory}-allocation`;

  return (
    <Box testID={testID} height={16} alignItems="center" flexDirection="row" gap="s">
      {variant === 'labeled' && (
        <Box flexDirection="row" minWidth={70} gap="s" justifyContent="space-between">
          <Text numberOfLines={1} variant="tertiary" color="textSecondary">
            {label}
          </Text>
          <Text variant="tertiary" color="textSecondary">
            {formatPercentage(percentage, { digits: 0 })}
          </Text>
        </Box>
      )}

      <ProgressBar
        current={percentage}
        total={100}
        type="thin"
        progressStyle={{ backgroundColor }}
      />

      {variant === 'trailing-percentage' && (
        <Text variant="tertiary" color="textSecondary">
          {formatPercentage(percentage, { digits: 0 })}
        </Text>
      )}
    </Box>
  );
};

export default AllocationVisualisation;
