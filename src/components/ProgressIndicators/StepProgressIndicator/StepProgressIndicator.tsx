import React from 'react';

import Box from 'src/components/Box';

interface StepProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

interface StepProgressIndicatorStepProps {
  isActive: boolean;
}

const StepProgressIndicatorStep: React.FC<StepProgressIndicatorStepProps> = ({ isActive }) => (
  <Box
    testID="step-indicator.step"
    borderRadius="xs"
    flex={1}
    height={4}
    backgroundColor={isActive ? 'dataBlue2' : 'backgroundInactive'}
  />
);

const StepProgressIndicator: React.FC<StepProgressIndicatorProps> = ({ currentStep, totalSteps }) => (
  <Box flex={1} flexDirection="row" gap="xxs">
    {Array.from({ length: totalSteps }, (_, stepIndex) => (
      <StepProgressIndicatorStep key={stepIndex} isActive={stepIndex < currentStep} />
    ))}
  </Box>
);

export default StepProgressIndicator;
