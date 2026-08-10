import React from 'react';

import { PressableBox } from './Button/PressableButton';
import Text from './Text/Text';

export type LinkProps = React.ComponentProps<typeof PressableBox> & {
  label: string;
};

const Link: React.FC<LinkProps> = ({ label, ...props }) => {
  return (
    <PressableBox {...props} accessibilityRole="button">
      <Text variant="secondary" color={props.disabled ? 'linkDisabled' : 'linkActive'}>
        {label}
      </Text>
    </PressableBox>
  );
};

export default Link;
