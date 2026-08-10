import { useBottomSheet } from '@gorhom/bottom-sheet';
import React, { PropsWithChildren, useEffect, useRef } from 'react';
import { Image, ImageSourcePropType } from 'react-native';
import { AllProps } from '@shopify/restyle';
import { Theme } from 'src/styling/restyle/defaultTheme';

import Box from '../Box';
import Button from '../Button/Button';
import Text from '../Text/Text';
import TextMd from '../TextMd';
import { MarkdownProps } from 'react-native-markdown-display';
import { Controller, FieldValues, Path, Validate } from 'react-hook-form';
import type { Control } from 'react-hook-form';
import Input, { InputProps } from 'src/components/Form/Input';
import { Colors } from 'src/models/Colors';
import spacing from 'src/styling/spacing';

/** Sheet CTAs only use non-responsive button variants; use `primary` + `disabled` (not `primaryDisabled`) like `Button`. */
type HelpSheetCTAVariant = 'primary' | 'secondary' | 'link' | 'attention' | 'alert';

interface HelpSheetCTAProps extends AllProps<Theme> {
  label: string;
  onPress?: () => void;
  labelColor?: Colors;
  disabled?: boolean;
  variant?: HelpSheetCTAVariant;
}
interface HelpSheetContentMDProps extends MarkdownProps {
  content: string;
}
interface HelpSheetInputProps<T extends FieldValues = FieldValues> {
  label: string;
  inputProps?: InputProps;
  validate?: Validate<string, unknown>;
  fieldName: Path<T>;
  control: Control<T>;
}
interface HelpSheetComposition {
  Title: React.FC<{ title: string; testID?: string }>;
  ContentMD: React.FC<HelpSheetContentMDProps>;
  Input: <T extends FieldValues>(props: HelpSheetInputProps<T>) => React.ReactElement | null;
  Image: React.FC<{ image: { source: ImageSourcePropType; height: number } }>;
  CTA: React.FC<HelpSheetCTAProps>;
}

interface HelpSheetProps {
  testID?: string;
  onOpened?: () => void;
}

const HelpSheet: React.FC<PropsWithChildren<HelpSheetProps>> & HelpSheetComposition = ({
  testID,
  onOpened,
  children,
}) => {
  const onOpenedRef = useRef(onOpened);
  onOpenedRef.current = onOpened;

  useEffect(() => {
    onOpenedRef.current?.();
  }, []);

  return (
    <Box
      testID={testID}
      paddingVertical="m"
      paddingHorizontal="s"
      backgroundColor="backgroundSurface"
      paddingBottom="xl"
    >
      {children}
    </Box>
  );
};

const HelpSheetTitle: React.FC<{ title: string; testID?: string }> = ({ title, testID }) => {
  return (
    <Text variant="h3" color="textPrimary" marginBottom="s" testID={testID}>
      {title}
    </Text>
  );
};

const HelpSheetContentMD: React.FC<HelpSheetContentMDProps> = ({ content, ...rest }) => {
  return (
    <TextMd variant="secondary" color="textSecondary" bottomSpacing={spacing.xs} {...rest}>
      {content}
    </TextMd>
  );
};

const HelpSheetInput = <T extends FieldValues>({
  label,
  inputProps,
  validate,
  fieldName,
  control,
}: HelpSheetInputProps<T>) => {
  return (
    <Controller
      control={control}
      name={fieldName}
      rules={{ required: true, validate }}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <Input
          label={label}
          {...inputProps}
          value={value}
          onChangeText={onChange}
          errorMessage={error?.message}
        />
      )}
    />
  );
};

const HelpSheetImage: React.FC<{ image: { source: ImageSourcePropType; height: number } }> = ({
  image,
}) => {
  return (
    <Image
      style={{ height: image.height, width: '100%', resizeMode: 'contain' }}
      source={image.source}
    />
  );
};

const FILLED_LABEL_VARIANTS = new Set<HelpSheetCTAVariant>(['primary', 'attention', 'alert']);

const HelpSheetCTA: React.FC<HelpSheetCTAProps> = ({
  label,
  labelColor,
  disabled,
  onPress,
  variant = 'link',
  marginTop = 'm',
}) => {
  const { close } = useBottomSheet();
  const resolvedLabelColor =
    labelColor ?? (FILLED_LABEL_VARIANTS.has(variant) ? 'textInverse' : 'linkActive');
  return (
    <Box marginTop={marginTop}>
      <Button
        variant={variant}
        disabled={disabled}
        onPress={() => {
          if (onPress === undefined) {
            close();
          } else {
            onPress();
          }
        }}
        labelColor={resolvedLabelColor}
        label={label}
      />
    </Box>
  );
};

HelpSheet.Title = HelpSheetTitle;
HelpSheet.ContentMD = HelpSheetContentMD;
HelpSheet.Input = HelpSheetInput;
HelpSheet.Image = HelpSheetImage;
HelpSheet.CTA = HelpSheetCTA;

export default HelpSheet;
