import React from 'react';
import { Image, Pressable } from 'react-native';
import type { AccessibilityRole, ImageSourcePropType } from 'react-native';
import type { ResponsiveValue } from '@shopify/restyle';

import Box from 'src/components/Box';
import CardHeader from 'src/components/Cards/CardHeader/CardHeader';
import Link from 'src/components/Link';
import Tag from 'src/components/Tag';
import Text from 'src/components/Text/Text';

import borderWidth from 'src/styling/borderWidth';
import spacing from 'src/styling/spacing';

import type { Theme } from 'src/styling/restyle/defaultTheme';
import type { Testable } from 'src/utils/testable';

const IMAGE_DEFAULT_HEIGHT = 160;
const IMAGE_DEFAULT_WIDTH = 270;
const DEFAULT_DESCRIPTION_LINES = 3;

interface ImageProps {
  src: ImageSourcePropType;
  width?: number;
  height?: number;
}

interface ReadMoreProps {
  label: string;
  onPress: () => void;
}

interface PortfolioSelectionCardProps extends Testable {
  title: string;
  description: string;
  descriptionNumberOfLines?: number;
  readMore?: ReadMoreProps;
  image: ImageProps;
  backgroundColor: ResponsiveValue<keyof Theme['colors'], Theme['breakpoints']>;
  borderColor?: ResponsiveValue<keyof Theme['colors'], Theme['breakpoints']>;
  isSelected?: boolean;
  tag?: string;
  illustrationTag?: string;
  onPress: () => void;
  accessibilityRole?: AccessibilityRole;
}

const PortfolioSelectionCard: React.FC<PortfolioSelectionCardProps> = ({
  image,
  title,
  description,
  descriptionNumberOfLines = DEFAULT_DESCRIPTION_LINES,
  readMore,
  backgroundColor,
  borderColor = 'backgroundBase',
  isSelected = false,
  tag,
  illustrationTag,
  onPress,
  accessibilityRole = 'radio',
  testID = 'portfolio-selection-card',
}) => {
  return (
    <Box
      testID={`${testID}.box`}
      borderRadius="l"
      borderWidth={borderWidth.s}
      borderColor={isSelected ? 'borderActive' : borderColor}
      backgroundColor="backgroundSurface"
      overflow="hidden"
    >
      <Pressable
        testID={testID}
        onPress={onPress}
        accessibilityRole={accessibilityRole}
        accessibilityLabel={title}
        accessibilityState={accessibilityRole === 'radio' ? { selected: isSelected } : undefined}
      >
        <Box paddingVertical="s" backgroundColor={backgroundColor} alignItems="center" justifyContent="center">
          {illustrationTag && (
            <Box position="absolute" top={spacing.offsetXs} left={spacing.offsetXs}>
              <Tag testID={`${testID}.illustration-tag`} label={illustrationTag} inverted={true} />
            </Box>
          )}
          <Image
            testID={`${testID}.image`}
            style={{
              width: image.width ?? IMAGE_DEFAULT_WIDTH,
              height: image.height ?? IMAGE_DEFAULT_HEIGHT,
              alignSelf: 'center',
            }}
            resizeMode="contain"
            source={image.src}
          />
        </Box>

        <Box paddingHorizontal="s" paddingTop="m" paddingBottom="m" gap="xs">
          <CardHeader testID={`${testID}.header`} title={title} tag={tag} />
          <Box gap="xxs">
            <Text
              testID={`${testID}.description`}
              variant="secondary"
              color="textSecondary"
              numberOfLines={descriptionNumberOfLines}
            >
              {description}
            </Text>
            {readMore && (
              <Link testID={`${testID}.read-more`} label={readMore.label} onPress={readMore.onPress} hitSlop={8} />
            )}
          </Box>
        </Box>
      </Pressable>
    </Box>
  );
};

export default PortfolioSelectionCard;
