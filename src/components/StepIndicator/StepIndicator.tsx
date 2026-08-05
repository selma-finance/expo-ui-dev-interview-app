import React from 'react';

import Box from '../Box';

export interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

const renderStep = (position: number, currentStep: number) => {
  const isActive = position === currentStep;
  const stepColor = isActive ? 'backgroundActive' : 'backgroundInactive';

  return (
    <Box
      width={24}
      height={4}
      borderRadius="s"
      marginRight="xs"
      backgroundColor={stepColor}
      key={`step-${position}`}
      testID="step-indicator.step"
    />
  );
};

const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep, totalSteps }) => {
  const steps = [];
  for (let position = 0; position < totalSteps; position++) {
    steps.push(renderStep(position, currentStep));
  }

  return (
    <Box flexDirection="row" alignItems="center" justifyContent="center">
      {steps}
    </Box>
  );
};

export default StepIndicator;
