import { createTheme } from "@shopify/restyle"

import { darkColorsSemantic, lightColorsSemantic } from "../../../design-language/src/figmaColors"
import ThemeMode from "src/models/ThemeMode"
import borderWidth from "../borderWidth"
import { fontFamily, fontSize } from "../font"
import radius from "../radius"
import spacing from "../spacing"

const theme = createTheme({
  colors: { ...lightColorsSemantic },
  mode: ThemeMode.LIGHT,
  spacing: {
    none: 0,
    xxs: spacing.xxs,
    xs: spacing.xs,
    s: spacing.s,
    m: spacing.m,
    l: spacing.l,
    xl: spacing.xl,
    offsetXs: spacing.offsetXs,
    offsetS: spacing.offsetS,
    offsetM: spacing.offsetM,
    offsetXl: spacing.offsetXl,
    viewSpacing: spacing.viewSpacing,
  },
  breakpoints: {
    phone: 0,
    tablet: 768,
    largeTablet: 1024,
  },
  borderRadii: {
    none: radius.none,
    xs: radius.xs,
    s: radius.s,
    m: radius.m,
    l: radius.l,
    xl: radius.xl,
    round: radius.round,
  },
  buttonVariants: {
    defaults: {
      paddingHorizontal: "s",
      // minHeight (not height) so long labels can wrap to a second line
      minHeight: 48,
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: "l",
    },
    primary: {
      backgroundColor: "backgroundButtonActive",
    },
    primaryDisabled: {
      backgroundColor: "backgroundButtonDisabled",
    },
    secondary: {
      borderColor: "borderActive",
      borderWidth: borderWidth.m,
    },
    secondaryDisabled: {
      borderColor: "borderDisabled",
      borderWidth: borderWidth.m,
    },
    link: {
      paddingHorizontal: 0,
      paddingVertical: 0,
    },
    attention: {
      backgroundColor: "backgroundButtonAttention",
    },
    alert: {
      backgroundColor: "backgroundAlert",
    },
  },
  textVariants: {
    defaults: {
      fontFamily: fontFamily.fontRegular,
    },
    h1: {
      fontSize: fontSize.H1,
      fontFamily: fontFamily.fontBold,
      lineHeight: 29,
    },
    h2: {
      fontSize: fontSize.H2,
      lineHeight: 26,
      fontFamily: fontFamily.fontBold,
    },
    h3: {
      fontSize: fontSize.H3,
      lineHeight: 22,
      fontFamily: fontFamily.fontBold,
    },
    primary: {
      fontSize: fontSize.Primary,
      fontFamily: fontFamily.fontRegular,
      lineHeight: 24,
    },
    secondary: {
      fontSize: fontSize.Secondary,
      lineHeight: 20,
      fontFamily: fontFamily.fontMedium,
    },
    tertiary: {
      fontSize: fontSize.Tertiary,
      fontFamily: fontFamily.fontRegular,
      lineHeight: 16,
    },
    navigation: {
      fontSize: fontSize.Navigation,
      fontFamily: fontFamily.fontRegular,
      lineHeight: 16,
    },
  },
})

export type Theme = typeof theme
export default theme

export const darkTheme: Theme = {
  ...theme,
  mode: ThemeMode.DARK,
  colors: { ...darkColorsSemantic },
}
