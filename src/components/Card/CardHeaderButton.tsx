import React from "react"
import spacing from "src/styling/spacing"

import Box from "../Box"
import { PressableBox } from "../Button/PressableButton"

type CardHeaderButtonProps = React.ComponentProps<typeof PressableBox>

const CardHeaderButton: React.FC<CardHeaderButtonProps> = ({ children, ...props }) => {
  const slop = spacing.xs

  return (
    <PressableBox {...props} hitSlop={{ top: slop, right: slop, bottom: slop, left: slop }}>
      <Box>{children}</Box>
    </PressableBox>
  )
}

export default CardHeaderButton
