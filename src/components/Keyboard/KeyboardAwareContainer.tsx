import React from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';
import type { PropsWithChildren } from 'react';
import type { KeyboardAvoidingViewProps } from 'react-native';

type KeyboardAwareContainerProps = PropsWithChildren<
  Omit<KeyboardAvoidingViewProps, 'behavior' | 'contentContainerStyle'>
>;

const KeyboardAwareContainer = (props: KeyboardAwareContainerProps) => {
  const { style, children, ...rest } = props;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={[{ flex: 1 }, style]}
      {...rest}
    >
      {children}
    </KeyboardAvoidingView>
  );
};

export default KeyboardAwareContainer;
