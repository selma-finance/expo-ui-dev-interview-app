import { useTheme } from "@shopify/restyle"
import { Theme } from "src/styling/restyle/defaultTheme"

const useBorderBottomColor = (hasError: boolean, isFocused: boolean) => {
  const { colors } = useTheme<Theme>()
  if (hasError) {
    return colors.borderAlert
  }
  return isFocused ? colors.borderFocused : colors.borderDefault
}

export default useBorderBottomColor
