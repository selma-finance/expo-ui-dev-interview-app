import React from 'react';

import BaseCard from 'src/components/Cards/BaseCard/BaseCard';
import PortfolioValueBox, {
  PortfolioValueBoxProps,
} from 'src/components/PortfolioValueBox/PortfolioValueBox';
import PortfolioValueBoxGrid from 'src/components/PortfolioValueBox/PortfolioValueBoxGrid';
import { Testable } from 'src/utils/testable';

export interface StatsCardProps extends Testable {
  items: PortfolioValueBoxProps[];
}

const StatsCard: React.FC<StatsCardProps> = ({ items, testID }) => (
  <BaseCard testID={testID}>
    <PortfolioValueBoxGrid rowGap="m">
      {items.map((item) => (
        <PortfolioValueBox key={item.testID ?? item.label} {...item} />
      ))}
    </PortfolioValueBoxGrid>
  </BaseCard>
);

export default StatsCard;
