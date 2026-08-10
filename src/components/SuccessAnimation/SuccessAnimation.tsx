import LottieView from "lottie-react-native"
import React from "react"

import Box from "../Box"
import Text from "../Text/Text"

interface SuccessAnimationProps {
  title: string
  onAnimationFinish?: () => void
  testID?: string
}

const SuccessAnimation: React.FC<SuccessAnimationProps> = ({ title, onAnimationFinish, testID }) => {
  return (
    <Box testID={testID} alignContent="center" marginBottom="l">
      <Box marginHorizontal="s" marginTop="s">
        <Text variant="h3" color="textPrimary" textAlign="center">
          {title}
        </Text>
      </Box>
      <LottieView
        autoPlay
        loop={false}
        style={{
          width: 200,
          height: 200,
          alignSelf: "center",
        }}
        source={require("../../../assets/animations/success.json")}
        // Lottie fires onAnimationFinish both for completion and cancellation (e.g., closing/unmounting the sheet); only react to a full run
        onAnimationFinish={isCancelled => {
          if (!isCancelled) {
            onAnimationFinish?.()
          }
        }}
      />
    </Box>
  )
}

export default SuccessAnimation
