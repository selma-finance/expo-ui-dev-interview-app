import { useTheme } from '@shopify/restyle';
import React, { useEffect } from 'react';
import { Image } from 'react-native';
import Animated, {
  cancelAnimation,
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import { Theme } from 'src/styling/restyle/defaultTheme';
import { isE2E } from 'src/utils/isE2E';

const spinnerSizes = {
  xsmall: 24,
  small: 32,
  large: 60,
};

const useRotationAnimation = (duration = 800) => {
  const rotation = useSharedValue(0);
  useEffect(() => {
    // Skip the continuous rotation under E2E: maestro-runner waits for the view
    // hierarchy to settle before every tap, and an infinite animation never settles.
    if (isE2E()) return;

    rotation.value = withRepeat(
      withTiming(360, {
        duration,
        easing: Easing.linear,
      }),
      -1,
    );
    return () => cancelAnimation(rotation);
  }, [duration, rotation]);

  return useAnimatedStyle(() => ({
    transform: [{ rotateZ: `${rotation.value}deg` }],
  }));
};
export const LoadingSpinner: React.FC<{ size?: 'xsmall' | 'small' | 'large' }> = ({
  size = 'large',
}) => {
  const { images } = useTheme<Theme>();
  const animatedStyles = useRotationAnimation();

  return (
    <Animated.View style={animatedStyles}>
      <Image
        testID="loading-spinner"
        resizeMode="contain"
        resizeMethod="resize"
        source={images.loadingSpinner}
        style={{ height: spinnerSizes[size], width: spinnerSizes[size] }}
      />
    </Animated.View>
  );
};
