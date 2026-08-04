import { BoxProps as RestyleBoxProps, createBox } from "@shopify/restyle"
import { Theme } from "src/styling/restyle/defaultTheme"

const Box = createBox<Theme>()

export type BoxProps = RestyleBoxProps<Theme>

export default Box
