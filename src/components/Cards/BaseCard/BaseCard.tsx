import React from 'react';

import Box from 'src/components/Box';
import { Testable } from 'src/utils/testable';

type BoxPropsWithoutChildren = Omit<React.ComponentProps<typeof Box>, 'children'>;

export interface BaseCardProps extends Testable {
  children?: React.ReactNode;
  cardBoxProps?: BoxPropsWithoutChildren;
  slotBoxProps?: BoxPropsWithoutChildren;
}

const DEFAULT_SLOT_BOX_PROPS = {
  alignSelf: 'stretch',
  gap: 's',
} as const satisfies BoxPropsWithoutChildren;

const BaseCard: React.FC<BaseCardProps> = ({ children, testID, cardBoxProps, slotBoxProps }) => {
  const mergedSlotBoxProps = { ...DEFAULT_SLOT_BOX_PROPS, ...slotBoxProps };

  return (
    <Box
      testID={testID}
      backgroundColor="backgroundSurface"
      borderRadius="l"
      paddingHorizontal="s"
      paddingVertical="m"
      {...cardBoxProps}
    >
      <Box {...mergedSlotBoxProps}>{children}</Box>
    </Box>
  );
};

export default BaseCard;
