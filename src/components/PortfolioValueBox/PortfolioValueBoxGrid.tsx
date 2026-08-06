import React from 'react';

import Box from 'src/components/Box';
import { Testable } from 'src/utils/testable';

export interface PortfolioValueBoxGridProps extends Testable {
  children: React.ReactNode;
  rowGap?: React.ComponentProps<typeof Box>['gap'];
}

const chunkPairs = <T,>(items: T[]): T[][] => {
  const rows: T[][] = [];
  for (let index = 0; index < items.length; index += 2) {
    rows.push(items.slice(index, index + 2));
  }
  return rows;
};

const flattenChildren = (children: React.ReactNode): React.ReactElement[] =>
  React.Children.toArray(children).flatMap((child) => {
    if (React.isValidElement(child) && child.type === React.Fragment) {
      return flattenChildren(
        (child.props as { children?: React.ReactNode }).children,
      );
    }
    return React.isValidElement(child) ? [child] : [];
  });

const PortfolioValueBoxGrid: React.FC<PortfolioValueBoxGridProps> = ({
  children,
  testID,
  rowGap = 'l',
}) => {
  const items = flattenChildren(children);
  const rows = chunkPairs(items);

  return (
    <Box testID={testID} gap={rowGap}>
      {rows.map((row, rowIndex) => (
        <Box key={rowIndex} flexDirection="row" gap="m">
          {row.map((item, itemIndex) => (
            <Box key={itemIndex} flex={1}>
              {item}
            </Box>
          ))}
          {row.length === 1 && <Box flex={1} />}
        </Box>
      ))}
    </Box>
  );
};

export default PortfolioValueBoxGrid;
