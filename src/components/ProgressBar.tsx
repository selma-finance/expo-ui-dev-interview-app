import React, { useEffect } from 'react';
import { StyleProp, StyleSheet, ViewStyle } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import Box from 'src/components/Box';

interface ProgressBarProps {
  current: number;
  total: number;
  style?: StyleProp<ViewStyle>;
  type?: 'default' | 'thin';
  testID?: string;
  progressStyle?: StyleProp<ViewStyle>;
}

const PROGRESS_BAR_HEIGHT = 16;

const ProgressBar: React.FC<ProgressBarProps> = ({
  current,
  total,
  style,
  type = 'default',
  progressStyle,
  testID,
}) => {
  const percent = total > 0 ? Math.min(Math.max(current / total, 0), 1) : 0;
  const scaleX = useSharedValue(0);

  useEffect(() => {
    scaleX.value = withTiming(1, {
      duration: 300,
      easing: Easing.inOut(Easing.ease),
    });
  }, [scaleX]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scaleX: scaleX.value }],
  }));

  return (
    <Box
      testID={testID}
      height={type === 'thin' ? PROGRESS_BAR_HEIGHT / 2 : PROGRESS_BAR_HEIGHT}
      backgroundColor="backgroundInactive"
      borderRadius="round"
      flex={1}
      position="relative"
      overflow="hidden"
      style={style}
    >
      <Animated.View
        style={[styles.progress, { width: `${percent * 100}%` }, animatedStyle, progressStyle]}
      />
    </Box>
  );
};

const styles = StyleSheet.create({
  progress: {
    height: '100%',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    transformOrigin: 'left',
  },
});

export default ProgressBar;
