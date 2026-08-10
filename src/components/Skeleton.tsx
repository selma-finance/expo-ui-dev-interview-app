import React from "react"
import { DimensionValue } from "react-native"
import Box from "./Box"

type BoxProps = React.ComponentProps<typeof Box>

interface SkeletonProps extends BoxProps {
  variant?: "text" | "rect" | "circle" | "carousel"
  height?: number
  width?: DimensionValue
}

const Skeleton: React.FC<SkeletonProps> = ({ height = 18, variant = "rect", width = "100%", ...otherProps }) => {
  const borderRadiusMap = {
    text: { borderRadius: "s" },
    rect: { borderRadius: "l" },
    circle: { borderRadius: "round" },
    carousel: {
      borderTopLeftRadius: "l",
      borderBottomLeftRadius: "l",
    },
  } as const

  const borderRadius = borderRadiusMap[variant]

  const finalWidth = variant === "circle" ? height : width

  return (
    <Box
      backgroundColor="backgroundInactive"
      height={height}
      width={finalWidth}
      testID="skeleton-box"
      {...borderRadius}
      {...otherProps}
    />
  )
}

export default Skeleton
