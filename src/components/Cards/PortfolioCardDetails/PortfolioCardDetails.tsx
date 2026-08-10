import React from 'react';

import { PressableBox } from 'src/components/Button/PressableButton';
import Box from 'src/components/Box';
import StepProgressIndicator from 'src/components/ProgressIndicators/StepProgressIndicator/StepProgressIndicator';
import Text from 'src/components/Text/Text';
import borderWidth from 'src/styling/borderWidth';
import { Testable } from 'src/utils/testable';

export interface PortfolioCardDetailsProps extends Testable {
  title?: string;
  level: string;
  currentStep: number;
  totalSteps: number;
  onPress: () => void;
}

const PortfolioCardDetails: React.FC<PortfolioCardDetailsProps> = ({
  title,
  level,
  currentStep,
  totalSteps,
  onPress,
  testID,
}) => (
  <Box flex={1} minHeight={100} testID={testID}>
    <PressableBox
      flex={1}
      onPress={onPress}
      backgroundColor="backgroundSurface"
      padding="s"
      borderRadius="m"
      borderWidth={borderWidth.xs}
      borderColor="borderDefault"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      gap="s"
    >
      <Box alignItems="center" flex={1}>
        {title && (
          <Text color="textSecondary" variant="secondary" textAlign="center">
            {title}
          </Text>
        )}
        <Text color="textPrimary" variant="secondary" fontWeight="bold" textAlign="center">
          {level}
        </Text>
      </Box>
      <StepProgressIndicator currentStep={currentStep} totalSteps={totalSteps} />
    </PressableBox>
  </Box>
);

export default PortfolioCardDetails;
