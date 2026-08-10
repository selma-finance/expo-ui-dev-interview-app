import Ionicons from '@expo/vector-icons/Ionicons';
import { BottomSheetTextInput, useBottomSheetInternal } from '@gorhom/bottom-sheet';
import { useTheme } from '@shopify/restyle';
import React, { useState } from 'react';
import {
  StyleSheet,
  TextInput,
  TextInputEndEditingEvent,
  TextInputProps,
  ViewStyle,
} from 'react-native';
import borderWidth from 'src/styling/borderWidth';
import { fontFamily, fontSize } from 'src/styling/font';
import { Theme } from 'src/styling/restyle/defaultTheme';

import useBorderBottomColor from './useBorderBottomColor';
import Box from '../Box';
import Text from '../Text/Text';

export interface InputProps {
  label?: string;
  placeholder?: string;
  style?: ViewStyle;
  fieldStyle?: ViewStyle;
  password?: boolean;
  textInputProps?: TextInputProps;
  onFocus?: () => void;
  value?: string;
  onBlur?: () => void;
  onPress?: () => void;
  errorMessage?: string;
  isError?: boolean;
  helpMessage?: string;
  onChangeText?: (text: string) => void;
  onEndEditing?: (event: TextInputEndEditingEvent) => void;
  testID?: string;
  rightElement?: React.ReactElement;
  leftElement?: React.ReactElement;
  autoFocus?: boolean;
}

const Input = ({
  label,
  placeholder,
  style,
  fieldStyle,
  password = false,
  value,
  textInputProps,
  onFocus,
  onBlur,
  rightElement,
  leftElement,
  errorMessage,
  isError,
  helpMessage,
  onChangeText,
  onPress,
  onEndEditing,
  testID,
  autoFocus,
  ref: forwardedRef,
}: InputProps & { ref?: React.Ref<TextInput> }) => {
  const { colors } = useTheme<Theme>();

  // When this input lives inside a @gorhom/bottom-sheet, render its
  // BottomSheetTextInput instead of a plain RN TextInput. The sheet only tracks
  // the keyboard once a BottomSheetTextInput reports focus (it sets the keyboard
  // "target"); with a plain TextInput gorhom caches and drops the keyboard-shown
  // event, so the sheet never resizes and an absolutely-positioned footer (e.g. a
  // Save button) stays pinned behind the keyboard. Outside a sheet,
  // useBottomSheetInternal(true) returns null and we keep the plain TextInput.
  // BottomSheetTextInput accepts the same props and forwards its ref to a
  // TextInput-compatible instance, so the cast keeps the call site RN-typed.
  const isInsideBottomSheet = useBottomSheetInternal(true) !== null;
  const TextInputComponent = (
    isInsideBottomSheet ? BottomSheetTextInput : TextInput
  ) as typeof TextInput;

  const [isPassword, setIsPassword] = useState(password);
  const [isFocus, setIsFocus] = useState(false);

  const onFocusHandler = () => {
    setIsFocus(true);
    onFocus?.();
  };

  const onBlurHandler = () => {
    setIsFocus(false);
    onBlur?.();
  };

  const borderBottomColor = useBorderBottomColor(!!(isError && errorMessage), isFocus);

  return (
    <Box style={style}>
      {label && (
        <Box marginBottom="xxs">
          <Text variant="tertiary" color="textSecondary" fontWeight="600">
            {label}
          </Text>
        </Box>
      )}

      <Box
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        backgroundColor="backgroundSurface"
        borderBottomWidth={borderWidth.s}
        paddingHorizontal="offsetXs"
        paddingVertical="s"
        style={[{ borderBottomColor }, fieldStyle]}
      >
        {leftElement}
        <TextInputComponent
          onEndEditing={onEndEditing}
          testID={testID}
          ref={forwardedRef}
          onPress={onPress}
          value={value}
          placeholder={placeholder}
          placeholderTextColor={colors.textTertiary}
          secureTextEntry={isPassword}
          style={[styles.input, { color: colors.textPrimary }]}
          onFocus={onFocusHandler}
          onBlur={onBlurHandler}
          onChangeText={onChangeText}
          autoFocus={autoFocus}
          {...textInputProps}
        />
        {password && (
          <Ionicons
            testID={`${testID}.secure-toggle`}
            onPress={() => setIsPassword(!isPassword)}
            name={isPassword ? 'eye' : 'eye-off'}
            size={fontSize.IconSize}
            color={isFocus ? colors.iconActive : colors.iconInactive}
          />
        )}
        {rightElement}
      </Box>
      <Box marginTop="xxs" gap="xxs">
        {errorMessage && (
          <Text testID={`${testID}-error-message`} variant="tertiary" color="textAlert">
            {errorMessage}
          </Text>
        )}

        {helpMessage && (
          <Text variant="tertiary" color="textSecondary">
            {helpMessage}
          </Text>
        )}
      </Box>
    </Box>
  );
};

const styles = StyleSheet.create({
  input: {
    flex: 1,
    fontSize: fontSize.Primary,
    fontFamily: fontFamily.fontSemiBold,
    borderWidth: 0,
    paddingTop: 0,
    paddingBottom: 0,
  },
});

Input.displayName = 'Input';

export default Input;
