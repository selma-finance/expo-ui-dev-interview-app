import React from 'react';
import { Pressable } from 'react-native';

import BaseCard from 'src/components/Cards/BaseCard/BaseCard';
import type { PortfolioCategoryKey } from 'src/types/schemaTypes';
import AllocationCategory, { AllocationCategoryProps } from './AllocationCategory';

interface AssetAllocationCardProps {
  assets: AllocationCategoryProps[];
  // When provided, each category row becomes tappable and reports its key (e.g. to open a fund-list sheet).
  onCategoryPress?: (portfolioCategory: PortfolioCategoryKey) => void;
}

const AssetAllocationCard: React.FC<AssetAllocationCardProps> = ({ assets, onCategoryPress }) => {
  return (
    <BaseCard>
      {assets.map((asset) =>
        onCategoryPress ? (
          <Pressable
            key={asset.portfolioCategory}
            testID={`asset-allocation-row-${asset.portfolioCategory}`}
            onPress={() => onCategoryPress(asset.portfolioCategory)}
          >
            <AllocationCategory {...asset} />
          </Pressable>
        ) : (
          <AllocationCategory key={asset.portfolioCategory} {...asset} />
        ),
      )}
    </BaseCard>
  );
};

export default AssetAllocationCard;
