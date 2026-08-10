import React from 'react';

import Box from 'src/components/Box';
import Text from 'src/components/Text/Text';

interface AllocationChangeHeaderProps {
  title: string;
  detail: string;
}

const AllocationChangeHeader: React.FC<AllocationChangeHeaderProps> = ({ title, detail }) => (
  <Box flexDirection="row" gap="s" alignItems="center">
    <Box flex={1}>
      <Text
        variant="secondary"
        color="textPrimary"
        fontWeight="700"
        numberOfLines={1}
        ellipsizeMode="tail"
      >
        {title}
      </Text>
    </Box>
    <Text variant="tertiary" color="textSecondary">
      {detail}
    </Text>
  </Box>
);

export default AllocationChangeHeader;
