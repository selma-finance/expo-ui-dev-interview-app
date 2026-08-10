import React from 'react';

import Box from 'src/components/Box';
import { PortfolioCategoryKey } from 'src/types/schemaTypes';
import { useFormatPercentage } from 'src/utils/useFormatPercentage';

import AllocationChangeHeader from './AllocationChangeHeader';
import AllocationVisualisation from './AllocationVisualisation';

interface VisualisationData {
  label: string;
  percentage: number;
  portfolioCategory: PortfolioCategoryKey;
}

export interface AllocationChangeCategoryProps {
  headerTitle: string;
  headerDetail: {
    label: string;
    percentage: number;
  };
  visualisations: VisualisationData[];
}

const AllocationChangeCategory: React.FC<AllocationChangeCategoryProps> = ({
  headerTitle,
  headerDetail,
  visualisations,
}) => {
  const formatPercentage = useFormatPercentage();

  return (
    <Box flex={1} flexDirection="column" gap="xxs">
      <AllocationChangeHeader
        title={headerTitle}
        detail={`${headerDetail.label} ${formatPercentage(headerDetail.percentage, { digits: 0 })}`}
      />
      <Box gap="xxs" flex={1}>
        {visualisations.map((visualisation, index) => (
          <AllocationVisualisation
            key={`${visualisation.portfolioCategory}-${visualisation.label}`}
            variant="labeled"
            label={visualisation.label}
            percentage={visualisation.percentage}
            portfolioCategory={visualisation.portfolioCategory}
            isInactive={index > 0}
          />
        ))}
      </Box>
    </Box>
  );
};

export default AllocationChangeCategory;
