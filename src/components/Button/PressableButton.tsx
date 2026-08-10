import { createBox } from '@shopify/restyle';
import React from 'react';
import { Pressable, PressableProps } from 'react-native';
import { Theme } from 'src/styling/restyle/defaultTheme';

type PressableBoxProps = PressableProps & { children?: React.ReactNode };

export const PressableBox = createBox<Theme, PressableBoxProps>(Pressable);

const PressableButton: React.FC<PressableBoxProps> = ({ children, ...rest }: PressableBoxProps) => {
  return (
    <PressableBox
      style={({ pressed }) => [{ transform: [{ scale: pressed ? 0.98 : 1 }] }]}
      {...rest}
    >
      {children}
    </PressableBox>
  );
};

export default PressableButton;
