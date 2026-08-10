import React from 'react';

import Box from 'src/components/Box';
import Text from 'src/components/Text/Text';
import { Testable } from 'src/utils/testable';

export interface PortfolioValueBoxProps extends Testable {
  label: string;
  value: string;
}

const PortfolioValueBox: React.FC<PortfolioValueBoxProps> = ({ label, value, testID }) => (
  <Box testID={testID} flexDirection="column" gap="xxs">
    <Text variant="tertiary" color="textTertiary" fontWeight="600">
      {label}
    </Text>
    <Text variant="secondary" color="textPrimary" fontWeight="600">
      {value}
    </Text>
  </Box>
);

export default PortfolioValueBox;
