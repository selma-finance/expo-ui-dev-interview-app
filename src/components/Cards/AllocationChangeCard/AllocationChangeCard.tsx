import React from 'react';

import BaseCard from 'src/components/Cards/BaseCard/BaseCard';

import AllocationChangeCategory, {
  AllocationChangeCategoryProps,
} from './AllocationChangeCategory';

interface AllocationChangeCardProps {
  assets: AllocationChangeCategoryProps[];
}

const AllocationChangeCard: React.FC<AllocationChangeCardProps> = ({ assets }) => (
  <BaseCard cardBoxProps={{ flex: 1 }}>
    {assets.map((asset, index) => (
      <AllocationChangeCategory
        key={`${asset.headerTitle}-${index}`}
        headerTitle={asset.headerTitle}
        headerDetail={asset.headerDetail}
        visualisations={asset.visualisations}
      />
    ))}
  </BaseCard>
);

export default AllocationChangeCard;
