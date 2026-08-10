import React from 'react';

import BaseCard from 'src/components/Cards/BaseCard/BaseCard';
import PressableButton from 'src/components/Button/PressableButton';
import Box from 'src/components/Box';
import Text from 'src/components/Text/Text';
import { Testable } from 'src/utils/testable';

interface CustomerSupportCardSmallProps extends Testable {
  title: string;
  linkLabel: string;
  onPress: () => void;
}

const CustomerSupportCardSmall: React.FC<CustomerSupportCardSmallProps> = ({
  testID,
  title,
  linkLabel,
  onPress,
}) => (
  <PressableButton testID={testID} onPress={onPress} accessibilityRole="button">
    <BaseCard>
      <Box gap="xs">
        <Text variant="h3" color="textPrimary">
          {title}
        </Text>
        <Text variant="secondary" color="linkActive" fontWeight="500">
          {linkLabel}
        </Text>
      </Box>
    </BaseCard>
  </PressableButton>
);

export default CustomerSupportCardSmall;
