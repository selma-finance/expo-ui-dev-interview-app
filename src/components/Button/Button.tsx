import {
  AllProps,
  composeRestyleFunctions,
  createBox,
  createVariant,
  ResponsiveValue,
  useRestyle,
  VariantProps,
} from "@shopify/restyle"
import React from "react"
import { StyleProp, TouchableOpacity, TouchableOpacityProps, ViewStyle } from "react-native"
import { Theme } from "src/styling/restyle/defaultTheme"

import Text from "../Text/Text"

const ButtonBox = createBox<Theme, TouchableOpacityProps & { children?: React.ReactNode }>(TouchableOpacity)

const variant = createVariant<Theme, "buttonVariants">({
  themeKey: "buttonVariants",
})

//based on: https://github.com/Shopify/restyle/issues/147 and https://github.com/HurrellT/restyleVariantsExample/pull/1
type RestyleProps = AllProps<Theme> & VariantProps<Theme, "buttonVariants">

export type ButtonProps = RestyleProps &
  React.ComponentProps<typeof ButtonBox> & {
    disabled?: boolean
    labelColor?: ResponsiveValue<keyof Theme["colors"], Theme["breakpoints"]>
    iconLeft?: React.ReactNode
    iconRight?: React.ReactNode
    label: string
  }

const restyleFunctions = composeRestyleFunctions<Theme, RestyleProps>([variant])

const Button: React.FC<ButtonProps> = ({
  disabled,
  style,
  labelColor,
  label,
  iconLeft,
  iconRight,
  ...rest
}: ButtonProps) => {
  const updatedRest = { ...rest }
  if (disabled) {
    if (rest.variant === "primary") {
      updatedRest.variant = "primaryDisabled"
    } else if (rest.variant === "secondary") {
      updatedRest.variant = "secondaryDisabled"
    }
  }
  const props = useRestyle(restyleFunctions, updatedRest)
  // useRestyle resolves the variant into `style`, but doesn't surface it on the
  // return type. Read it explicitly so the caller's `style` merges on top of the
  // variant instead of replacing it (an undefined caller style would otherwise
  // wipe the variant's background/padding).
  const variantStyle = (props as { style?: StyleProp<ViewStyle> }).style

  return (
    <ButtonBox disabled={disabled} {...props} style={[variantStyle, style]} accessibilityRole="button">
      {iconLeft}

      {label ? (
        <Text variant="primary" fontWeight="bold" textAlign="center" color={labelColor ?? "textInverse"}>
          {label}
        </Text>
      ) : null}

      {iconRight}
    </ButtonBox>
  )
}

export default Button
