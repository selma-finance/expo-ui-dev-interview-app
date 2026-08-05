import React from 'react';

import Box from 'src/components/Box';
import Button, { ButtonProps } from 'src/components/Button/Button';

interface BottomActionContainerProps {
  cta: ButtonProps & { variant?: 'primary' };
}

const BottomActionContainer: React.FC<BottomActionContainerProps> = ({ cta }) => {
  return (
    <Box paddingHorizontal="s" paddingVertical="xs">
      <Button
        flex={1}
        variant="primary"
        label={cta.label}
        onPress={cta.onPress}
        disabled={cta.disabled}
        testID={cta.testID}
      />
    </Box>
  );
};

export default BottomActionContainer;
