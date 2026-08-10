import React from 'react';
import Box from 'src/components/Box';
import AllocationChangeHeader from 'src/components/Cards/AllocationChangeCard/AllocationChangeHeader';
import AllocationVisualisation from 'src/components/Cards/AllocationChangeCard/AllocationVisualisation';
import { PortfolioCategoryKey } from 'src/types/schemaTypes';

export interface AllocationCategoryProps {
  title: string;
  detail: string;
  percentage: number;
  portfolioCategory: PortfolioCategoryKey;
}

const AllocationCategory: React.FC<AllocationCategoryProps> = ({
  title,
  detail,
  percentage,
  portfolioCategory,
}) => {
  return (
    <Box flexDirection="column" gap="xxs">
      <AllocationChangeHeader title={title} detail={detail} />
      <AllocationVisualisation
        variant="bar-only"
        percentage={percentage}
        portfolioCategory={portfolioCategory}
      />
    </Box>
  );
};

export default AllocationCategory;
