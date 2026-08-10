import * as React from 'react';
import { useCallback, useEffect, useState } from 'react';
import { useWindowDimensions } from 'react-native';

import AnimatedCarousel from './AnimatedCarousel';
import BottomDots from './BottomDots';
import Box from '../Box';
import spacing from 'src/styling/spacing';
import { isE2E } from 'src/utils/isE2E';

interface CarouselProps<T> {
  testID?: string;
  data: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  keyExtractor?: (item: T, index: number) => string;
  hideBottomDots?: boolean;
  width?: number;
  widthOffset?: number;
  height?: number;
  defaultIndex?: number;
  activeIndex?: number;
  onIndexChange?: (index: number) => void;
  autoPlay?: boolean;
  autoPlayInterval?: number;
}

const calculateWidth = (isOnlyItem: boolean, pageWidth: number, widthOffset?: number) => {
  if (isOnlyItem) return pageWidth - spacing.s;
  if (widthOffset) return pageWidth - widthOffset;
  return pageWidth * 0.93;
};

function Carousel<T>({
  testID,
  data,
  renderItem,
  keyExtractor,
  height,
  width,
  widthOffset,
  hideBottomDots = false,
  defaultIndex = 0,
  activeIndex,
  onIndexChange,
  autoPlay = false,
  autoPlayInterval = 6000,
}: CarouselProps<T>) {
  const { width: pageWidth } = useWindowDimensions();

  const [currentIndex, setCurrentIndex] = useState(defaultIndex);
  const shouldPadItems = width === undefined;
  const calculatedWidth = width ?? calculateWidth(data.length === 1, pageWidth, widthOffset);

  useEffect(() => {
    if (activeIndex !== undefined) {
      setCurrentIndex(activeIndex);
    }
  }, [activeIndex]);

  const handleIndexChange = useCallback(
    (index: number) => {
      setCurrentIndex(index);
      onIndexChange?.(index);
    },
    [onIndexChange],
  );

  return (
    <>
      <AnimatedCarousel
        testID={testID}
        data={data}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        itemWidth={calculatedWidth}
        height={height ?? 370}
        bounces={!hideBottomDots}
        defaultIndex={defaultIndex}
        activeIndex={activeIndex}
        onIndexChange={handleIndexChange}
        autoPlay={autoPlay && !isE2E()}
        autoPlayInterval={autoPlayInterval}
        padItems={shouldPadItems}
      />
      {!hideBottomDots && (
        <Box paddingVertical="xs">
          <BottomDots numberOfItems={data.length} currentIndex={currentIndex} />
        </Box>
      )}
    </>
  );
}

export default Carousel;
