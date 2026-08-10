import React from "react"
import { Platform, Switch as RNSwitch } from "react-native"
import { useTheme } from "@shopify/restyle"
import { Theme } from "src/styling/restyle/defaultTheme"

const Switch: React.FC<React.ComponentProps<typeof RNSwitch>> = ({ disabled, value, ...props }) => {
  const { colors } = useTheme<Theme>()
  return (
    <RNSwitch
      {...props}
      value={value}
      disabled={disabled}
      // RN's Android <Switch> does not surface its on/off state to the
      // accessibility tree, so assistive tech (VoiceOver/TalkBack) cannot tell
      // whether it is on. Expose it explicitly as a switch whose checked state
      // tracks `value`. Note: this is for assistive tech only — it does NOT make
      // the state queryable by Maestro on Android, so the E2E flow asserts on
      // downstream UI (allocation rows) rather than a `checked` filter.
      accessibilityRole="switch"
      accessibilityState={{ checked: value ?? false, disabled: disabled ?? false }}
      trackColor={
        disabled
          ? { true: colors.backgroundDisabled, false: colors.backgroundDisabled }
          : { true: colors.backgroundActive }
      }
      {...(Platform.OS === "android" ? { thumbColor: colors.backgroundSurface } : {})}
    />
  )
}

export default Switch
