import React from "react"

import Box from "./Box"
import { LoadingSpinner } from "src/components/Loaders/LoadingSpinner"

interface LoadingOverlayProps {
  visible?: boolean
}

export const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ visible }) => {
  if (!visible) {
    return null
  }

  return (
    <Box
      style={{
        position: "absolute",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        backgroundColor: "rgba(0,0,0,0.25)",
        zIndex: 100,
      }}
      justifyContent="center"
      alignItems="center"
      borderRadius="l"
    >
      <LoadingSpinner />
    </Box>
  )
}
