import * as React from 'react';
import { useCallback, useEffect, useMemo, useRef } from 'react';
import { NativeScrollEvent, NativeSyntheticEvent, useWindowDimensions } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import Box from '../Box';
import spacing from 'src/styling/spacing';

interface AnimatedCarouselProps<T> {
  testID?: string;
  data: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  keyExtractor?: (item: T, index: number) => string;
  itemWidth: number;
  height: number;
  bounces: boolean;
  defaultIndex: number;
  activeIndex?: number;
  onIndexChange: (index: number) => void;
  autoPlay: boolean;
  autoPlayInterval: number;
  padItems: boolean;
}

function AnimatedCarousel<T>({
  testID,
  data,
  renderItem,
  keyExtractor = (_item: T, index: number) => String(index),
  itemWidth,
  height,
  bounces,
  defaultIndex,
  activeIndex,
  onIndexChange,
  autoPlay,
  autoPlayInterval,
  padItems,
}: AnimatedCarouselProps<T>) {
  const { width: pageWidth } = useWindowDimensions();
  const currentIndexRef = useRef(defaultIndex);
  const scrollViewRef = useRef<ScrollView>(null);
  const autoPlayTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const lastIndex = data.length - 1;

  const itemPaddingLeft = spacing.s;

  const snapOffsets = useMemo(() => {
    if (!padItems || data.length <= 1) return;

    const maxScroll = Math.max(0, data.length * itemWidth + itemPaddingLeft - pageWidth);
    const peekTotal = pageWidth - itemWidth;
    const leftPeek = (peekTotal - itemPaddingLeft) / 2;

    return data.map((_, index) => {
      if (index === 0) return 0;
      return Math.min(index * itemWidth - leftPeek, maxScroll);
    });
  }, [data, itemWidth, pageWidth, padItems, itemPaddingLeft]);

  const getScrollXForIndex = useCallback(
    (index: number) => snapOffsets?.[index] ?? index * itemWidth,
    [snapOffsets, itemWidth],
  );

  useEffect(() => {
    if (activeIndex === undefined || activeIndex === currentIndexRef.current) return;
    currentIndexRef.current = activeIndex;
    scrollViewRef.current?.scrollTo({ x: getScrollXForIndex(activeIndex), animated: true });
  }, [activeIndex, getScrollXForIndex]);

  const stopAutoPlay = useCallback(() => {
    if (autoPlayTimerRef.current) clearInterval(autoPlayTimerRef.current);
  }, []);

  const startAutoPlay = useCallback(() => {
    if (!autoPlay) return;
    stopAutoPlay();

    autoPlayTimerRef.current = setInterval(() => {
      if (currentIndexRef.current >= lastIndex) {
        stopAutoPlay();
        return;
      }

      const nextIndex = currentIndexRef.current + 1;
      currentIndexRef.current = nextIndex;
      onIndexChange(nextIndex);
      scrollViewRef.current?.scrollTo({ x: getScrollXForIndex(nextIndex), animated: true });
    }, autoPlayInterval);
  }, [autoPlay, autoPlayInterval, lastIndex, onIndexChange, stopAutoPlay, getScrollXForIndex]);

  useEffect(() => {
    if (!autoPlay) return;
    startAutoPlay();
    return stopAutoPlay;
  }, [autoPlay, startAutoPlay, stopAutoPlay]);

  const findClosestIndex = useCallback(
    (scrollX: number) => {
      if (!snapOffsets) return Math.round(scrollX / itemWidth);
      return snapOffsets.reduce(
        (closest, offset, index) =>
          Math.abs(scrollX - offset) < Math.abs(scrollX - (snapOffsets[closest] ?? 0))
            ? index
            : closest,
        0,
      );
    },
    [snapOffsets, itemWidth],
  );

  const handleMomentumScrollEnd = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const index = findClosestIndex(event.nativeEvent.contentOffset.x);
      currentIndexRef.current = index;
      onIndexChange(index);

      if (autoPlay) {
        startAutoPlay();
      }
    },
    [findClosestIndex, onIndexChange, autoPlay, startAutoPlay],
  );

  return (
    <ScrollView
      ref={scrollViewRef}
      testID={testID}
      horizontal
      showsHorizontalScrollIndicator={false}
      snapToInterval={snapOffsets ? undefined : itemWidth}
      snapToOffsets={snapOffsets}
      decelerationRate="fast"
      bounces={bounces}
      overScrollMode={bounces ? 'always' : 'never'}
      onMomentumScrollEnd={handleMomentumScrollEnd}
      contentOffset={{ x: getScrollXForIndex(defaultIndex), y: 0 }}
      style={{ width: '100%', height, flexGrow: 0, flexShrink: 0 }}
      contentContainerStyle={{
        alignItems: 'flex-start',
        ...(padItems && data.length > 1 && { paddingRight: itemPaddingLeft }),
      }}
    >
      {data.map((item, index) => {
        return (
          <Box
            key={keyExtractor(item, index)}
            style={{ width: itemWidth }}
            paddingLeft={padItems ? 's' : 'none'}
          >
            {renderItem(item, index)}
          </Box>
        );
      })}
    </ScrollView>
  );
}

export default AnimatedCarousel;
