import React from 'react';
import { AccessibilityProps, PixelRatio } from 'react-native';

import Box from 'src/components/Box';
import borderWidth from 'src/styling/borderWidth';
import iconSize from 'src/styling/iconSize';
import { Testable } from 'src/utils/testable';

export interface CheckboxProps extends Testable, AccessibilityProps {
  isActive: boolean;
  disabled?: boolean;
}

const CHECKBOX_SIZE = iconSize.medium;
const CHECKBOX_SIZE_HALF = PixelRatio.roundToNearestPixel(CHECKBOX_SIZE * 0.5);
const CHECKBOX_SIZE_FULL = PixelRatio.roundToNearestPixel(CHECKBOX_SIZE);

export const Checkbox: React.FC<CheckboxProps> = ({
  isActive,
  disabled = false,
  testID,
  ...accessibilityProps
}) => {
  const activeColor = disabled ? 'selectorsActiveDisabled' : 'selectorsActive';
  const inactiveColor = disabled ? 'selectorsDisabled' : 'selectorsDefault';

  return (
    <Box
      testID={testID}
      alignItems="center"
      borderColor={isActive ? activeColor : inactiveColor}
      borderRadius="s"
      borderWidth={borderWidth.s}
      width={CHECKBOX_SIZE_FULL}
      height={CHECKBOX_SIZE_FULL}
      justifyContent="center"
      accessible={true}
      accessibilityRole="checkbox"
      accessibilityLabel={testID}
      accessibilityState={{ checked: isActive, disabled }}
      {...accessibilityProps}
    >
      {isActive && (
        <Box
          borderWidth={borderWidth.s}
          backgroundColor={activeColor}
          width={CHECKBOX_SIZE_HALF}
          height={CHECKBOX_SIZE_HALF}
          borderColor={activeColor}
        />
      )}
    </Box>
  );
};
